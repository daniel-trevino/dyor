import React, { useEffect } from 'react'
import useLocalStorageStore from '../hooks/useLocalStorageStore'
import useWeb3Store from '../hooks/useWeb3Store'
import useMulticallStore from '../hooks/useMulticallStore'

const AppBootstrap: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { init: initLocalStorageStore } = useLocalStorageStore()
  const { init: initWeb3Store } = useWeb3Store()
  const { init: initMulticallStore } = useMulticallStore()

  useEffect(() => {
    initWeb3Store()
    initMulticallStore()
    initLocalStorageStore()
  }, [initMulticallStore, initLocalStorageStore, initWeb3Store])

  return <>{children}</>
}

export default AppBootstrap
