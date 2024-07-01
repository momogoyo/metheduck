import CategoryLinks from '@/app/ui/goods/category-links'

export default function SideNav() {
  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full md:sticky md:block">
      <div className="relative h-full overflow-hidden py-6 pr-6 lg:py-8">
        <CategoryLinks />
      </div>
    </aside>
  )
}
