'use client'

import { BookOpenText, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const list = [
  {
    name: 'Home',
    href: '#',
  },
  {
    name: 'Location',
    href: '#',
  },
  {
    name: 'About',
    href: '#',
  },
  {
    name: 'Explore',
    href: '#',
  },
  {
    name: 'Contact',
    href: '#',
  },
]

export default function HomeHeader() {
  const [showNav, setShowNav] = useState(false)

  return (
    <header className="header" id="header">
      <div className="nav container-1">
        <Link href="#" className="nav__logo">
          <BookOpenText className="w-6 h-6" />
          <h1 className="font-bold text-xl">Poetry</h1>
        </Link>

        <div className={`nav__menu ${showNav && 'show-menu'}`} id="nav-menu">
          <ul className="nav__list">
            {list.map((item, index) => (
              <li key={index} className="nav__item">
                <Link href={item.href} className="nav__link hover:text-primary-foreground/60">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div onClick={() => setShowNav(false)} className="nav__close">
            <X />
          </div>
        </div>

        <div onClick={() => setShowNav(true)} className="nav__toggle">
          <Menu />
        </div>
      </div>
    </header>
  )
}
