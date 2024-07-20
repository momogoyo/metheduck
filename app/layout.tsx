import '@/app/ui/global.css'
import { cn } from '@/scripts/utils'
import { fontSans } from '@/app/ui/fonts'
import Header from '@/app/ui/Header'

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
          <Header />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
