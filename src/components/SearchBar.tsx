import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/components/SearchBar.module.css'

export function SearchBar() {
  const [active, setActive] = useState(false)
  const [timeout, setTimeOut] = useState(setTimeout(()=> {}, 0))
  const [processing, setProcessing] = useState(false)
  const router = useRouter()

  function handleFocus() {
    setActive(true)
  }

  function handleBlur() {
    setActive(false)
  }

  function handleChange() {
    clearTimeout(timeout)
    setTimeOut(
      setTimeout(()=> {
        setProcessing(true)
        setTimeout(()=> {setProcessing(false)}, 1500)
      }, 1000)
    )
  }

  function onSubmit(event: any) {
    event.preventDefault()
    router.push("/")
    console.info(event)
  }

  return (
    <form onSubmit={onSubmit} className={`${styles.container} ${processing && styles.processing} ${active ? styles.active : ''}`}>
      <i className={styles.searchIcon} />
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.searchInput}
        placeholder={active ? '' : 'pesquisar dentro do smartseg'}
      />
    </form>
  )
}
