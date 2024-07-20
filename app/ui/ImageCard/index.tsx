import styles from './ImageGallery.module.css'
import { useRef, useState } from 'react'
import { cn } from '@/scripts/utils'

import { Card } from '@/components/ui/card'

interface CardProps {
  url: string
  title: string
}

export default function ImageCard ({
  url,
  title
}: CardProps) {
  const [isLoad, setIsLoad] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const onLoad = () => {
    if (imageRef.current?.complete) {
      setIsLoad(true)
    }
  }

  return (
    <Card className={cn('flex', 'flex-col', 'items-center', 'space-y-3', 'max-w-lg', 'w-full', 'overflow-hidden')}>
      <div className={cn(styles.box, { [styles.pixel]: !isLoad })}>
        <img
          src={`/small/${title}`}
          alt={title}
          className={cn(styles.small, 'w-full', 'aspect-square', 'block', { [styles.hidden]: isLoad })}
          loading="lazy"
        />
        <img
          onLoad={onLoad}
          ref={imageRef}
          src={url}
          alt={title}
          className={cn(styles.original, 'w-full', 'aspect-square', 'block', { [styles.visible]: isLoad })}
          loading="lazy"
        />
      </div>
    </Card>
  )
}