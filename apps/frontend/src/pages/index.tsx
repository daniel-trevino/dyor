import Head from 'next/head'
import ConnectWalletButton from '../features/connect-wallet/ConnectWalletButton'
import TestContract from '../features/test-contract/TestContract'
import Wagmigochi from '../features/wagmigochi/Wagmigochi'

const Home: React.FC = () => (
  <div className="p-2">
    <Head>
      <title>DYOR dApp</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <nav className="flex top-0 right-0 justify-end mt-2 mr-2">
      <ConnectWalletButton />
    </nav>

    <main className="flex flex-col flex-1 justify-center items-center px-20 w-full text-center">
      <Wagmigochi />
      <TestContract />
    </main>
  </div>
)

export default Home
