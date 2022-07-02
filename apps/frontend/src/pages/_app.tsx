import { AppProps } from 'next/app'
import AppBootstrap from '../components/AppBootstrap'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <AppBootstrap>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </AppBootstrap>
)

export default MyApp
