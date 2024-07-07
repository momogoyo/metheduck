import {
  useEffect,
  useRef,
  useState
} from 'react'

export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }

  }, [targetRef, options])

  return [
    targetRef,
    isIntersecting
  ]
}