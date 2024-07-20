import styles from './hero.module.css'
import star from './star.module.css'
import { cn } from '@/scripts/utils'

export default function Hero() {
  return (
    <section className={cn(styles.wrapper)}>
      <div className={cn(star.stars)}></div>
      <div className={cn(star.stars2)}></div>
      <div className={cn(star.stars3)}></div>
      
      <div className={cn(styles.title)}>
        <span>미더덕의 별빛목욕</span>
        <br />
      </div>

      <div className={styles.hero}>
        <img src="./hero.png" alt="" />
      </div>
    </section>
  )
}
