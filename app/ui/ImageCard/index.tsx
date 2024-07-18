import styles from './ImageGallery.module.css'
import { useRef, useState } from 'react'
import { cn } from '@/scripts/utils'

import { Card } from '@/components/ui/card'

interface Card {
  url: string
  title: string
}

export default function ImageCard ({
  url,
  title
}: Card) {
  const [isLoad, setIsLoad] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const onLoad = () => {
    if (imageRef.current?.complete) {
      setTimeout(() => {

        setIsLoad(true)
      }, 250)
    }
  }

  return (
    <Card className={cn('flex', 'flex-col', 'space-y-3', 'max-w-lg', 'w-full', 'overflow-hidden')}>
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