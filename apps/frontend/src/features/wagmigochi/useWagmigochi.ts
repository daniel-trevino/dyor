import { ethers } from 'ethers'
import { useContractRead } from 'wagmi'
import { WagmigotchiAbi__factory } from '../../../generated/typechain'

type Response = {
  data: ethers.utils.Result | undefined
  error: Error | undefined
  loading: boolean | undefined
}

type UseWagmigotchi = {
  status: Response
}

export const useWagmigochi = (contractAddress: string): UseWagmigotchi => {
  const [{ data, error, loading }] = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: WagmigotchiAbi__factory.abi,
    },
    'getStatus'
  )

  return {
    status: { data, error, loading },
  }
}
