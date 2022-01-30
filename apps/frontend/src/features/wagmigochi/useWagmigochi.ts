import { ethers } from 'ethers'
import { useAppContractRead } from '../../hooks/useAppContractRead'

type Response = {
  data: ethers.utils.Result | undefined
  error: Error | undefined
  loading: boolean | undefined
}

type UseWagmigotchi = {
  status: Response
}

export const useWagmigochi = (): UseWagmigotchi => {
  const status = useAppContractRead('WAGMIGOTCHI', 'getStatus')

  return {
    status,
  }
}
