import './styles.css'
import { cn } from '@/scripts/utils'

type TabPanelProps = {
  isActive: boolean,
  content: string
}

export const TabPanel = ({
  isActive,
  content
}: TabPanelProps) => {

  return (
    <div className={
      cn(
        'panel',
        'hidden opacity-0 transition-[opacity] ease duration-[0.3s]',
        { 'active': isActive }
      )
    }>
      {content}
    </div>
  )
}

export default TabPanel;
