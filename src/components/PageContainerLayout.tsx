import { ReactElement } from 'react'
import styles from '@/styles/components/PageContainerLayout.module.css'

type PageContainerProps = {
  sidebar: ReactElement
  content: ReactElement
}

export function PageContainerLayout({ sidebar, content }: PageContainerProps) {
  return (
    <main className={styles.container}>
      {sidebar ? sidebar : <div />}
      {content}
    </main>
  )
}
