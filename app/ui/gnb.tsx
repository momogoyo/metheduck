import Logo from '@/app/ui/logo'
import Nav from '@/app/ui/info/nav-links'

export default function gnb() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
          <Nav />
        </div>
      </div>
    </header>
  )
}
