import { SearchBar } from './SearchBar'
import { UserBubble } from './UserBubble'
import styles from '../styles/components/Header.module.css'
import { useContext, useState } from 'react'
import { headerContext } from '../contexts/HeaderContext'
import { useRouter } from 'next/router'

export function Header({}) {
  const { headerType, setType } = useContext(headerContext)
  const router = useRouter()

  function back() {
    router.back()
  }
  return (
    <>
      <header className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.headerBar}>
            {headerType === 'sub' && <button  onClick={back} className={styles.back}></button>}
            {headerType === 'main' && <div className={styles.hiddenback} />}
            <img className={styles.logo} src="logo.svg" />
            {headerType === 'main' && <SearchBar />}
          </div>
          <div className={styles.userBubbleContainer}>
            <UserBubble />
          </div>
        </div>
      </header>
    </>
  )
}
