'use client'

import { useState, useEffect, useRef } from 'react'
import styles from '@/app/ui/gallery/gallery.module.css'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Card, CardContent } from '@/components/ui/card'

export default function Page() {
  const [data, setData] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [targetRef, isIntersecting] = useIntersectionObserver({ threshold: 1 })

  const pageRef = useRef(1)

  const fetchImages = async ({ page }: { page: number }) => {
    try {
      const response = await fetch(`/api/images?page=${page}&pageSize=20`)
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json()
      if (data.images) {
        setData((prev) => {
          const newData = [...prev, data.images]

          if (newData.length < data.totalImages) {
            setHasMore(true)
          } else {
            setHasMore(false)
          }

          return newData[0]
        })
      } else {
        setHasMore(false)
      }
    } catch(error) {
      setHasMore(false)
      setHasError(true)
    }
  }

  useEffect(() => {
    fetchImages({
      page: pageRef.current
    })
  }, [])

  useEffect(() => {
    if (hasMore && isIntersecting) {
      pageRef.current += 1
      
      fetchImages({
        page: pageRef.current
      })
    }
  }, [isIntersecting, hasMore])

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        {data.map((src, index) => (
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
