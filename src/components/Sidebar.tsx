import styles from '@/styles/components/Sidebar.module.css'
import { useRouter } from 'next/router'

type SideBarProps = {
  current: '/' | '/colab' | '/lessons'
}

const avaliablePages = [
  { name: 'Início', host: '/', icon: 'i-home' },
  { name: 'Treinamentos', host: '/colab', icon: 'i-layer' },
  { name: 'Colaboradores', host: '/lessons', icon: 'i-group' },
]

export function SideBar({ current }: SideBarProps) {
  const currentPage = avaliablePages.find((page) => page.host === current) || {host: null}
  const router = useRouter()

  function goTo(host: string) {
    router.push(host)
  }

  return (
    <aside className={styles.container}>
      {avaliablePages.map(({ host, name, icon}, index) => {
        return (
          <div className={`${styles.item} ${currentPage.host === host && styles.current}`} key={host +name + index} onClick={()=> {goTo(host)}}>
            <i className={icon} />
            <span>{name}</span>
          </div>
        )
      })}
    </aside>
  )
}
