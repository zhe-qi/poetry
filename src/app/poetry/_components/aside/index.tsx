"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowUpNarrowWide,
  SquareUserRound,
  ChartBarStacked,
  ArrowDownAz,
} from "lucide-react";
import clsx from "clsx";

const navOne = [
  {
    name: "全部诗词",
    icon: ArrowDownAz,
    href: "/",
    active: true,
    value: 114514,
  },
  {
    name: "作者分类",
    icon: SquareUserRound,
    href: "/about",
    active: false,
    value: 58,
  },
  {
    name: "诗词分类",
    icon: ChartBarStacked,
    href: "/contact",
    active: false,
    value: 1919,
  },
  {
    name: "排行榜",
    icon: ArrowUpNarrowWide,
    href: "/contact",
    active: false,
  },
];

const navTwo = [
  {
    name: "诗词分类",
    icon: ChartBarStacked,
    href: "/contact",
    active: false,
    value: 1919,
  },
  {
    name: "排行榜",
    icon: ArrowUpNarrowWide,
    href: "/contact",
    active: false,
  },
];

export default function MainAside() {
  return (
    <aside className="fixed left-0 top-16 z-10 box-border h-[calc(100vh-4rem)] w-16 overflow-y-auto overflow-x-hidden border-x border-b pt-3 xl:w-[calc(16rem+1px)]">
      <nav className="flex flex-col gap-2 px-2">
        {navOne.map((item) => (
          <Button
            className={clsx("bg-background text-foreground hover:bg-muted", item.active && "bg-muted")}
            asChild
            key={item.name}
          >
            <Link href={item} className="flex justify-between">
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span className="hidden xl:block">{item.name}</span>
              </div>
              <div className="hidden xl:block">{item.value}</div>
            </Link>
          </Button>
        ))}
      </nav>
      <div className="my-3 h-[1px] bg-border" />
      <nav className="flex flex-col gap-2 px-2">
        {navTwo.map((item) => (
          <Button
            className={clsx("bg-background text-foreground hover:bg-muted", item.active && "bg-muted")}
            asChild
            key={item.name}
          >
            <Link href={item} className="flex justify-between">
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span className="hidden xl:block">{item.name}</span>
              </div>
              <div className="hidden xl:block">{item.value}</div>
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
