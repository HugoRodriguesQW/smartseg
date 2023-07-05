import { Header } from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Open_Sans, Pontano_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

const pontanoSans = Pontano_Sans({
  subsets: ['latin'],
  variable: '--font-pontano-sans',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} ${pontanoSans.variable}`}>
      <Header />

      <Component {...pageProps} />
    </div>
  )
}
