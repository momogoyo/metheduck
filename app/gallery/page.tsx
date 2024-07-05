'use client'

import { useEffect, useState, useCallback } from 'react'
import styles from '@/app/ui/gallery/gallery.module.css'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export default function Page() {
  const [images, setImages] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const PAGESIZE = 20

  const fetchImages = useCallback(async (page: number) => {
    setLoading(true)

    try {
      const response = await fetch(`/api/images?page=${page}&pageSize=${PAGESIZE}`)
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json()
      setImages((prevImages) => [...prevImages, ...data.images])
      setHasMore(page < data.totalPages)
      setLoading(false)
    } catch (error) {
      console.error(`Error fetching /api/images: ${error}`)
      setLoading(false)
    }
  }, [])

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - 500

    if (window.innerHeight + window.scrollY >= scrollHeight && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [loading, hasMore])

  useEffect(() => {
    fetchImages(page)
  }, [page, fetchImages])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

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

        {loading && <p>Loading..</p>}
      </div>
    </div>
  )
}
