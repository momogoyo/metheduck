import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2">
      <Image
        width={600}
        height={834}
        src="/logo.png"
        alt="미더덕 로고"
        className="w-7"
      />

      <span className="hidden text-xl font-bold sm:inline-block">MTD</span>
    </Link>
  )
}
