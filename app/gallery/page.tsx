'use client'

import styles from '@/app/gallery/gallery.module.css'
import {
  useState,
  useEffect,
  useRef
} from 'react'
import { cn } from '@/scripts/utils'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import ImageCard from '@/app/ui/ImageCard'

type ImageProps = {
  id: number
  url: string
  title: string
}

type FetchOptions  = {
  page?: number
}

export default function Page() {
  const [images, setImages] = useState<ImageProps[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInitialFetch, setIsInitialFetch] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const pageRef = useRef(1)

  const [targetRef, isIntersecting] = useIntersectionObserver({ threshold: 1 })

  const fetchImages = async ({
    page
  }: FetchOptions) => {
    try {
      setIsError(false)
      
      const response = await fetch(`/api/images?page=${page}&pageSize=20`)
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json()
      if (data.images) {
        setImages((prev) => {
          const newData = [...prev, ...data.images]

          if (newData.length < data.totalImages) {
            setHasMore(true)
          } else {
            setHasMore(false)
          }

          return newData
        })
      } else {
        setHasMore(false)
      }
    } catch(error) {
      setHasMore(false)
      setIsError(true)
    } finally {
      setIsInitialFetch(false)
    }
  }

  useEffect(() => {
    if (!isFetching) {
      fetchImages({ page: pageRef.current })
      
      setIsFetching(false)
    }
  }, [])

  useEffect(() => {
    if (hasMore && isIntersecting) {
      pageRef.current += 1
      fetchImages({ page: pageRef.current })
    }
  }, [isIntersecting, hasMore])

  return (
    <div className={cn(styles.wrapper)}>
      {isError ? (
        <div>Error...</div>
      ) : isInitialFetch ? (
        <div>Loading...</div>
      ) : (
        <div className={cn(styles.gallery)}>
          {images.map(({ title, url }, index)  => (
            <ImageCard
              key={index}
              url={url}
              title={title}
            />
          ))}
        </div>  
      )}

      {hasMore && (
        <div ref={targetRef}>Loading...</div>
      )}
    </div>
  )
}
