import Content from "../_components/content";
import { db } from "@/server/db";
import { Star, ThumbsUp, ExternalLink, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Highlight from "../_components/content/highlight";
import { unstable_cache } from "next/cache";

const buttons = [
  {
    text: "开启拼音辅助阅读",
    icon: "拼",
  },
  {
    text: "开启AI帮助",
    icon: "AI",
  },
  {
    text: "开始语音朗读",
    icon: Volume2,
  },
  {
    text: "收藏",
    icon: Star,
  },
  {
    text: "点赞",
    icon: ThumbsUp,
  },
  {
    text: "分享",
    icon: ExternalLink,
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  const getPoetry = unstable_cache(
    async (id: string) => {
      const poetry = await db.poetry.findUnique({
        where: { id: Number(id) },
      });
      if (!poetry) {
        throw new Error("Poetry not found");
      }

      return poetry;
    },
    [params.id],
    {
      tags: ["poetry"],
      revalidate: 3600,
    },
  );
  const poetry = await getPoetry(params.id);

  return (
    <div className="mx-auto max-w-[828px]">
      <Content poetry={poetry}>
        {buttons.map((button, index) => (
          <Highlight key={index} text={button.text} underline={false}>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center gap-1"
            >
              {typeof button.icon === "string" ? (
                <span className="rotate-0 scale-100">{button.icon}</span>
              ) : (
                <button.icon className="h-4 w-4" />
              )}
              <span className="sr-only">{button.text}</span>
            </Button>
          </Highlight>
        ))}
      </Content>
    </div>
  );
}
