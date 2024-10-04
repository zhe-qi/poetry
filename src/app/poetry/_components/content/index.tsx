import { Button } from "@/components/ui/button";
import { type Poetry as PoetryType } from "@prisma/client";
import Highlight from "./highlight";
import Poetry from "./poetry";
import Translation from "./translation";
import React from "react";

interface ContentProps {
  poetry: PoetryType;
  children?: React.ReactNode;
}

function parseRemarks(remark: string): Array<{ key: string; value: string }> {
  const remarkArray = remark.split("\n");
  return remarkArray.flatMap((line) => {
    const [key, value] = line.split("：");
    if (!key || !value) return [];
    // 去掉中文括号及其内容
    const cleanedKey = key.replace(/（[^）]*）/g, '');
    return [{ key: cleanedKey, value }];
  });
}

const Content: React.FC<ContentProps> = ({ poetry, children }) => {
  const remark = parseRemarks(poetry.remark);
  const escapedKeywords = remark.map((remark) =>
    remark.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const regex = new RegExp(`(${escapedKeywords.join("|")})`, "g");

  const renderContent = () => {
    const lines = poetry.content.trim().split("\n");
    const lastRemarks: Record<string, string> = {};
    const keywordCounts: Record<string, number> = {};

    return lines.map((line, lineIndex) => {
      let inParentheses = false;
      const parts = line.split(/(\(|\)|(?:(?![()])[^])+)/);
      return (
        <React.Fragment key={lineIndex}>
          {parts.map((part, partIndex) => {
            if (part === "(") {
              inParentheses = true;
              return part;
            } else if (part === ")") {
              inParentheses = false;
              return part;
            } else if (!inParentheses) {
              return part.split(regex).map((subPart, subIndex) => {
                if (remark.some((remark) => remark.key === subPart)) {
                  const matchingRemarks = remark.filter(
                    (r) => r.key === subPart,
                  );
                  const currentCount = keywordCounts[subPart] || 0;
                  const currentRemark = matchingRemarks[currentCount];

                  if (
                    currentRemark &&
                    (!lastRemarks[subPart] ||
                      lastRemarks[subPart] === currentRemark.value)
                  ) {
                    keywordCounts[subPart] = currentCount + 1;
                    lastRemarks[subPart] = currentRemark.value;

                    return (
                      <Highlight
                        key={`${lineIndex}-${partIndex}-${subIndex}`}
                        text={currentRemark.value}
                      >
                        {subPart}
                      </Highlight>
                    );
                  }
                }
                return subPart;
              });
            }
            return part;
          })}
          {lineIndex < lines.length - 1 && (
            <>
              <br />
              {lineIndex % 2 === 1 && <span className="block h-4 w-full" />}
            </>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <Poetry poem={poetry}>{renderContent()}</Poetry>
      </div>

      <div className="mt-4 flex h-10 w-full items-center gap-4">{children}</div>

      <div className="mt-12">
        <Translation shangxi={poetry.shangxi} remark={poetry.remark} />
      </div>

      <div className="mt-12 pb-12">
        <div className="text-xl">关联标签</div>
        <div className="flex items-center gap-4 pt-6">
          {poetry.type.split(",").map((type, index) => (
            <Button variant="outline" key={index}>
              {type}
              <span className="sr-only">{type}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Content;
