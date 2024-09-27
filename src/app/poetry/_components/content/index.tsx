import { Button } from '@/components/ui/button';
import { type Poetry as PoetryType } from '@prisma/client';
// import parse, { domToReact } from 'html-react-parser';
import Highlight from './highlight';
import Poetry from './poetry';
import Translation from './translation';
import React from 'react';

interface ContentProps {
  poetry: PoetryType;
  children?: React.ReactNode;
}

function parseRemarks(remark: string): Record<string, string> {
  // 去掉前后的空格和换行符
  remark = remark.trim();

  // 按行分割注释字符串
  const lines = remark.split('\n');
  const result: Record<string, string> = {};

  for (const line of lines) {
    const separatorIndex = line.indexOf('：');
    if (separatorIndex !== -1) {
      const key = line.substring(0, separatorIndex);
      const value = line.substring(separatorIndex + 1);
      const newKey = key.replace(/（.*?）/g, '');

      // 将处理后的键值对添加到结果中
      Reflect.set(result, newKey.trim(), value.trim());
    }
  }

  return result;
}

const Content: React.FC<ContentProps> = ({ poetry, children }) => {
  const remark = parseRemarks(poetry.remark);
  const keywords = Object.keys(remark);

  const renderContent = () => {
    const lines = poetry.content.trim().split('\n');
    return lines.map((line, lineIndex) => {
      let inParentheses = false;
      const parts = line.split(/(\(|\)|(?:(?![()])[^])+)/);
      return (
        <React.Fragment key={lineIndex}>
          {parts.map((part, partIndex) => {
            if (part === '(') {
              inParentheses = true;
              return part;
            } else if (part === ')') {
              inParentheses = false;
              return part;
            } else if (!inParentheses) {
              // 转义特殊字符
              const escapedKeywords = keywords.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
              const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'g');
              return part.split(regex).map((subPart, subIndex) => {
                if (keywords.includes(subPart)) {
                  return (
                    <Highlight key={`${lineIndex}-${partIndex}-${subIndex}`} text={remark[subPart]!}>
                      {subPart}
                    </Highlight>
                  );
                }
                return subPart;
              });
            }
            return part;
          })}
          {lineIndex < lines.length - 1 && (
            <>
              <br />
              {lineIndex % 2 === 1 && <span className="h-4 block w-full" />}
            </>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <Poetry poem={poetry}>
          {renderContent()}
        </Poetry>
      </div>

      <div className="h-10 w-full gap-4 mt-4 flex items-center">
        {children}
      </div>

      <div className='mt-12'>
        <Translation shangxi={poetry.shangxi} remark={poetry.remark} />
      </div>

      <div className='mt-12 pb-12'>
        <div className="text-xl">关联标签</div>
        <div className="pt-6 flex items-center gap-4">
          {poetry.type.split(',').map((type, index) => (
            <Button variant="outline" key={index}>
              {type}
              <span className='sr-only'>{type}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Content;
