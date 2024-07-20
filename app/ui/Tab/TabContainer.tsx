'use client'

import './styles.css'
import {
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react'
import { cn } from '@/scripts/utils'

import Tab from './Tab'
import TabPanel from './TabPanel'

const TABS = [
  { id: 1, title: 'Tab 1', content: 'Content 1' },
  { id: 2, title: 'Tab 2', content: 'Content 2' },
  { id: 3, title: 'Tab 3', content: 'Content 3' },
]

export const TabContainer = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
    const elements = document.elementsFromPoint(clientX, clientY)
    const tabElement = elements.find(el => el.classList.contains('tab'))

    if (tabElement) {
      const tabId = parseInt(tabElement.getAttribute('data-id')!, 10)
      setActiveTab(tabId)
    }
  }, [])

  const handleMoveEnd = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.removeEventListener('mousemove', handleMove)
      containerRef.current.removeEventListener('touchmove', handleMove)
      setDragging(false)
    }
  }, [handleMove])

  const handleMoveStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMove)
      containerRef.current.addEventListener('touchmove', handleMove)
      setDragging(true)
    }
  }, [handleMove])

  useEffect(() => {
    if (dragging) {
      document.body.style.cursor = 'grabbing'
    } else {
      document.body.style.cursor = 'default'
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMove)
        containerRef.current.removeEventListener('touchmove', handleMove)
      }
    }
  }, [dragging, handleMove])

  return (
    <div 
      ref={containerRef}
      className={
        cn(
          'tab-container',
          'flex flex-col select-none'
        )
      }
      onMouseDown={handleMoveStart}
      onTouchStart={handleMoveStart}
      onMouseUp={handleMoveEnd}
      onTouchEnd={handleMoveEnd}
    >
      <div className={cn('tabs', 'flex')}>
        {TABS.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTab}
          />
        ))}
      </div>

      <div className={cn('tab-content')}>
        {TABS.map((tab) => (
          <TabPanel
            key={tab.id}
            isActive={tab.id === activeTab}
            content={tab.content}
          />
        ))}
      </div>
    </div>
  )
}

export default TabContainer
