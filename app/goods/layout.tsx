import Aside from '@/app/ui/Aside'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <Aside />

      <main className="relative py-6">{children}</main>
    </div>
  )
}
