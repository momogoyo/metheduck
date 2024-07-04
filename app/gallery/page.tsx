'use client'

import { useEffect, useState } from 'react'
import styles from '@/app/ui/gallery/gallery.module.css'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export default function Page() {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images')
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }

        const data = await response.json()
        setImages(data)
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }

    fetchImages()
  }, [])


  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        {images.map((src, index) => (
          <Card key={index}>
            <CardContent>
              <Image
                src={src}
                width={250}
                height={500}
                alt={`image-${index}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
