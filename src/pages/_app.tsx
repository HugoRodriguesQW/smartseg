import { Header } from '@/components/Header'
import { HeaderContextProvider } from '@/contexts/HeaderContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Open_Sans, Pontano_Sans } from 'next/font/google'
import headerStyle from '@/styles/components/Header.module.css'

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
    <div
      style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}
      className={`${headerStyle.gap} ${openSans.variable} ${pontanoSans.variable}`}
    >
      <HeaderContextProvider>
        <Header />
        <Component {...pageProps} />
      </HeaderContextProvider>
    </div>
  )
}
