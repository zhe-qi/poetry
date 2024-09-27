'use client'
import { useEffect } from 'react'
import SakuraEngine from '@/lib/sakura'

import '@/lib/sakura/sakura.css'

export default function Sakura() {
  useEffect(() => {
    // @ts-expect-error sakura 是一个构造函数
    void new SakuraEngine(".sakura")
  }, [])

  return <div className="sakura absolute w-full h-full left-0 top-0 z-99"></div>
}
