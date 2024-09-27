'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowUpNarrowWide, SquareUserRound, ChartBarStacked, ArrowDownAz } from 'lucide-react'

const navOne = [
  {
    name: '全部诗词',
    icon: ArrowDownAz,
    href: '/',
    active: true,
    value: 114514,
  },
  {
    name: '作者分类',
    icon: SquareUserRound,
    href: '/about',
    active: false,
    value: 58,
  },
  {
    name: '诗词分类',
    icon: ChartBarStacked,
    href: '/contact',
    active: false,
    value: 1919,
  },
  {
    name: '排行榜',
    icon: ArrowUpNarrowWide,
    href: '/contact',
    active: false,
  },
]

const navTwo = [
  {
    name: '诗词分类',
    icon: ChartBarStacked,
    href: '/contact',
    active: false,
    value: 1919,
  },
  {
    name: '排行榜',
    icon: ArrowUpNarrowWide,
    href: '/contact',
    active: false,
  },
]

export default function MainAside() {
  return (
    <aside className="w-16 xl:w-[calc(16rem+1px)] overflow-x-hidden fixed left-0 top-16 box-border overflow-y-auto pt-3 h-[calc(100vh-4rem)] border-x border-b z-10">
      <nav className="px-2 flex flex-col gap-2">
        {navOne.map((item) => (
          <Button className={`bg-background text-foreground hover:bg-muted ${item.active && 'bg-muted'}`} asChild key={item.name}>
            <Link href={item} className="flex justify-between">
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className='xl:block hidden'>{item.name}</span>
              </div>
              <div className='xl:block hidden'>{item.value}</div>
            </Link>
          </Button>
        ))}
      </nav>
      <div className="h-[1px] bg-border my-3" />
      <nav className="px-2 flex flex-col gap-2">
        {navTwo.map((item) => (
          <Button className={`bg-background text-foreground hover:bg-muted ${item.active && 'bg-muted'}`} asChild key={item.name}>
            <Link href={item} className="flex justify-between">
              <div className="flex items-center gap-2">
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className='xl:block hidden'>{item.name}</span>
              </div>
              <div className='xl:block hidden'>{item.value}</div>
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  )
}
