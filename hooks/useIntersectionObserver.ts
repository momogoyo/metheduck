import {
  useEffect,
  useRef,
  useState
} from 'react'

export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLDivElement | null>(null)

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
  ] as const
  // as const: 반환된 타입과 값을 고정할 수 있다. (튜플처럼)
}