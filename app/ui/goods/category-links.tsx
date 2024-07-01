'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'fancy', href: '/goods/fancy' },
  { name: 'kiring', href: '/goods/kiring' },
  { name: 'degital', href: '/goods/degital' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-sky-100 text-blue-600': pathname === link.href,
            }
          )}
        >
          <p>{link.name}</p>
        </Link>
      ))}
    </>
  )
}
