import { AppProps } from 'next/app'
import '../../styles/globals.css'
import AppBootstrap from '../components/AppBootstrap'

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <AppBootstrap>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </AppBootstrap>
)

export default MyApp
