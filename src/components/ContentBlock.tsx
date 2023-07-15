
import styles from '@/styles/components/ContentBlock.module.css'
import { useRouter } from 'next/router';
import { ReactElement } from 'react';


type ContentBlockProps = {
    title?: string;
    subtitle?: string;
    children: ReactElement;
    link?: {
        to: string,
        name: string
    }
}

export function ContentBlock({ link, title, subtitle, children }: ContentBlockProps) {
    const router = useRouter()

    function handleClick(l: string) {
        router.push(l)
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

                {children && <div className={styles.contentFrame}>
                    {children}
                </div>}
            </div>

            {link && (
                <div  className={styles.link} onClick={() => handleClick(link.to)}>
                    {link.name}
                </div>
            )}
        </div>
    )
}