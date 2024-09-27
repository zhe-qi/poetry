import {
  BookOpenText,
  House,
  Settings,
  Github,
  Search as SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { MainBreadcrumb } from "./breadcrumb";
import Search from "./search";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function MainHeader() {
  return (
    <header className="fixed left-0 top-0 z-10 box-border flex h-16 w-full items-center overflow-hidden border backdrop-blur">
      <div className="box-border hidden h-full w-64 items-center justify-center border-r px-2 xl:flex">
        <Link
          title="回到首页"
          href="/"
          className="flex w-full items-center justify-between rounded-md border px-4 py-[0.4379rem] hover:bg-muted"
        >
          <div className="flex items-center gap-2">
            <BookOpenText className="h-4 w-4" />
            <span>诗词</span>
          </div>
          <House className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex h-full flex-1 items-center justify-between px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <MainBreadcrumb />
        </Suspense>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Search />
          </div>
          <div className="block lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="flex items-center gap-1"
            >
              <SearchIcon className="h-4 w-4 rotate-0 scale-100" />
              <span className="sr-only">搜索</span>
            </Button>
          </div>
          <div>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center gap-1"
            >
              <Settings className="h-4 w-4 rotate-0 scale-100" />
              <span className="sr-only">设置</span>
            </Button>
          </div>
          <div>
            <ModeToggle />
          </div>
          <div>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center gap-1"
            >
              <Github className="h-4 w-4 rotate-0 scale-100" />
              <span className="sr-only">github</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
