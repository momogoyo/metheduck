import './styles.css'
import { cn } from '@/scripts/utils'

type TabProps = {
  tab: {
    id: number,
    title: string 
  },
  isActive: boolean
}

export const Tab = ({
  tab,
  isActive
}: TabProps) => {
  return (
    <div 
      data-id={tab.id}
      className={
        cn(
          'tab',
          'cursor-pointer select-none transition-[background-color] duration-[0.3s] ease-[ease] px-5 py-2.5',
          { 'active': isActive }
        )
    }>
      {tab.title}
    </div>
  )
}

export default Tab
