import { BookOpenText, House, Settings, Github, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { MainBreadcrumb } from './breadcrumb'
import Search from './search'
import { Button } from '@/components/ui/button'

export default function MainHeader() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 overflow-hidden box-border border flex items-center backdrop-blur z-10">
      <div className="xl:flex hidden items-center  px-2 box-border w-64 border-r h-full justify-center">
        <Link title="回到首页" href="/" className="hover:bg-muted flex items-center justify-between rounded-md border w-full px-4 py-[0.4379rem]">
          <div className="flex items-center gap-2">
            <BookOpenText className="w-4 h-4" />
            <span>诗词</span>
          </div>
          <House className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex-1 h-full px-4 justify-between flex items-center">
        <MainBreadcrumb />
        <div className="flex items-center gap-4">
          <div className='lg:block hidden'>
            <Search />
          </div>
          <div className='block lg:hidden'>
            <Button variant="outline" size="icon" className="flex items-center gap-1">
              <SearchIcon className="h-4 w-4 rotate-0 scale-100" />
              <span className="sr-only">搜索</span>
            </Button>
          </div>
          <div>
            <Button variant="outline" size="icon" className="flex items-center gap-1">
              <Settings className="h-4 w-4 rotate-0 scale-100" />
              <span className="sr-only">设置</span>
            </Button>
          </div>
          <div>
            <ModeToggle />
          </div>
          <div>
            <Button variant="outline" size="icon" className="flex items-center gap-1">
              <Github className="h-4 w-4 rotate-0 scale-100" />
              <span className="sr-only">github</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
