import { ChangeEvent, useState } from 'react'
// import { useContractRead } from 'wagmi'
// import { TestContract__factory } from '../../../generated/typechain'
import { useTestContract } from './useTestContract'
import AppButton from '../../components/AppButton'

const TestContractMessage: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const { message, setMessage } = useTestContract()

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  const onSetMessage = async (): Promise<void> => {
    await setMessage.run({
      args: [value],
    })
    setValue('')
  }

  return (
    <div>
      <div>
        <div className="mb-2 text-sm font-bold text-gray-700">Current message:</div>
        {message.loading ? <div>Loading...</div> : <div>{message.data}</div>}
      </div>
      <div className="mt-16 mb-4">
        <label className="mb-2 block text-left text-sm font-bold text-gray-700" htmlFor="username">
          New Message
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="newMessage"
            type="text"
            placeholder="Hello World!"
            value={value}
            onChange={onChange}
          />
        </label>
      </div>
      <AppButton
        onClick={onSetMessage}
        loading={setMessage.loading}
        disabled={!value || setMessage.loading}
        needsAccount
      >
        Set Message
      </AppButton>
    </div>
  )
}

export default TestContractMessage
