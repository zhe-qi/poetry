'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function Collapse({ children, height, lineClamp = null }: { lineClamp: number | null, children: React.ReactNode; height: number }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [needsCollapse, setNeedsCollapse] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    if ((contentRef.current as unknown as Element).scrollHeight > height) {
      setNeedsCollapse(true);
    }
  }, [height]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div
        ref={contentRef}
        className=' max-w-full'
        style={{
          ...(isCollapsed && lineClamp != null ? {
            WebkitLineClamp: lineClamp,
            WebkitBoxOrient: 'vertical',
            lineClamp: lineClamp, // 添加标准属性以提高兼容性
            boxOrient: 'vertical', // 添加标准属性以提高兼容性
            display: '-webkit-box',
          } : {}),
          maxHeight: isCollapsed ? `${height}px` : 'none',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        {children}
      </div>
      <div className="min-h-6 mt-2">
        {needsCollapse && (
          <button onClick={toggleCollapse} className="flex items-center gap-1">
            {isCollapsed ? '查看更多' : '收起'}
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        )}
      </div>
    </>
  );
};

