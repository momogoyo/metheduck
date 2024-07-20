import './styles.css'
import { useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/scripts/utils'

type CardProps = {
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
    <Card className={
      cn(
        'image-card',
        'flex flex-col space-y-3 max-w-lg	w-full overflow-hidden'
      )
    }>
      <div
        className={
          cn(
            'blured',
            'bg-no-repeat bg-cover',
            { 'loaded': isLoad }
          )
        }
        style={{ backgroundImage: `url('/small/${title}')` }}
      >
        <img
          onLoad={onLoad}
          ref={imageRef}
          src={url}
          alt={title}
          className={cn('w-full aspect-square block opacity-0')}
          loading="lazy"
        />
      </div>
    </Card>
  )
}