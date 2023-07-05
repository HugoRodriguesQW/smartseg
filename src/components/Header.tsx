import { SearchBar } from './SearchBar'
import { UserBubble } from './UserBubble'
import styles from '../styles/components/Header.module.css'

export function Header() {
  return (
    <>
      <div className={styles.gap} />
      <header className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.headerBar}>
            <img className={styles.logo} src="logo.svg" />
            <SearchBar />
          </div>
          <div className={styles.userBubbleContainer}>
            <UserBubble />
          </div>
        </div>
      </header>
    </>
  )
}
