import clsx from "clsx";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../../../../../public/fonts/kt.ttf",
  display: "block",
});

export default function Poetry({
  poem,
  children,
}: {
  children: React.ReactNode;
  poem: { title: string; dynasty: string; writer: string; content: string };
}) {
  return (
    <div className={clsx(myFont.className, "flex flex-col antialiased")}>
      <h2 className="text-4xl font-[500]">{poem.title}</h2>
      <p className="mb-4 mt-4 text-2xl">
        {poem.writer}（{poem.dynasty}）
      </p>
      <p className="poetry-p text-xl leading-loose tracking-wider">
        {children}
      </p>
    </div>
  );
}
