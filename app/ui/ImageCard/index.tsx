import Image from 'next/image'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

interface Card {
  url: string
  title: string
}

export default function ImageCard ({
  url,
  title
}: Card) {
  return (
    <Card>
      <CardContent>
        <Image
          src={url}
          alt={title}
          width={250}
          height={500}
          />
      </CardContent>
      <CardTitle>{title}</CardTitle>
    </Card>
  )
}