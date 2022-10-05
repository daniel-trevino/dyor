import Head from 'next/head'
import ConnectWalletButton from '../features/connect-wallet/ConnectWalletButton'
import SignerState from '../features/connect-wallet/SignerState'
import TestComponent from '../features/connect-wallet/TestComponent'

const Home: React.FC = () => (
  <div className="p-2">
    <Head>
      <title>DYOR dApp</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <nav className="top-0 right-0 mt-2 mr-2 flex justify-end">
      <ConnectWalletButton />
    </nav>

    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      {/* <TestContract /> */}
    </main>

    <SignerState />
    <TestComponent />
  </div>
)

export default Home
