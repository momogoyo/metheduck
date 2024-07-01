import '@/app/ui/global.css'
import { cn } from '@/lib/utils'
import { fontSans } from '@/app/ui/fonts'
import Gnb from '@/app/ui/gnb'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <div className="relative flex min-h-screen flex-col bg-background">
          <Gnb />

          <main className="container flex-1 py-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
