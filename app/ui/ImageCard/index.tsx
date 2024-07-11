import { Card } from '@/components/ui/card'

interface Card {
  url: string
  title: string
}

export default function ImageCard ({
  url,
  title
}: Card) {
  return (
    <Card className="flex flex-col space-y-3 max-w-lg	w-full overflow-hidden">
      <div 
        className={`blured bg-no-repeat bg-cover`}
        style={{ backgroundImage: `url('/small/${title}')` }}
      >
        <img
          src={url}
          alt={title}
          className="w-full aspect-square block opacity-0"
          loading="lazy"
        />
      </div>
    </Card>
  )
}