'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const links = [
  { name: 'Info', href: '/info' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Goods', href: '/goods' },
]

export default function Gnb() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.name}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
