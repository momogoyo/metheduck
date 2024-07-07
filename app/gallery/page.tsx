'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import styles from '@/app/ui/gallery/gallery.module.css'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export default function Page() {
  const elementRef = useRef(null)

  const [images, setImages] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const PAGESIZE = 20

  const fetchImages = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const response = await fetch(`/api/images?page=${page}&pageSize=${PAGESIZE}`)
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json()

      setImages((prevImages) => [...prevImages, ...data.images])
      setPage((prevPage) => prevPage + 1)
      setHasMore(page < data.totalPages)
      
      console.log(hasMore, page, images)
    } catch (error) {
      console.error(`Error fetching /api/images: ${error}`)
      setHasMore(false)
    }
  }

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    
    if (entry.isIntersecting && hasMore) {
      fetchImages()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection)

    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div ref={elementRef} className={styles.wrapper}>
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

        {hasMore && <p>Loading..</p>}
      </div>
    </div>
  )
}
