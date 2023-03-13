import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <main className={`${inter.variable} flex-center h-screen font-sans`}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </main>
)

export default MyApp
