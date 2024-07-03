import styles from '@/app/ui/gallery/gallery.module.css'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const images = [
  { url: '/images/IMG_01.JPG', alt: '밥아저씨 미더덕' },
  { url: '/images/IMG_02.JPG', alt: '김밥을 싼 미더덕' },
  { url: '/images/IMG_03.JPG', alt: '토스트 먹는 미더덕' },
  { url: '/images/IMG_04.JPG', alt: '잠든 미더덕' },
  { url: '/images/IMG_05.JPG', alt: '잠에서 깬 미더덕' },
  { url: '/images/IMG_06.JPG', alt: '그래 미더덕' },
  { url: '/images/IMG_07.JPG', alt: '청룡 미더덕' },
]

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        {images.map((image) => (
          <Card>
            <CardContent>
              <Image
                src={image.url}
                width={250}
                height={500}
                alt={image.alt}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
