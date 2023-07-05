import { useState } from 'react'
import styles from '../styles/components/SearchBar.module.css'

export function SearchBar() {
  const [active, setActive] = useState(false)
  const timeout = setTimeout(() => {}, 0)

  function handleFocus() {
    setActive(true)
  }

  function handleBlur() {
    setActive(false)
  }

  function handleChange() {
    clearTimeout(timeout)
  }

  return (
    <div className={`${styles.container} ${active ? styles.active : ''}`}>
      <i className={styles.searchIcon} />
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.searchInput}
        placeholder={active ? '' : 'pesquisar dentro do smartseg'}
      />
    </div>
  )
}
