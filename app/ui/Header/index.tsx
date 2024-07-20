import Logo from '@/app/ui/logo'
import Gnb from '@/app/ui/Gnb'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
          <Gnb />
        </div>
      </div>
    </header>
  )
}
