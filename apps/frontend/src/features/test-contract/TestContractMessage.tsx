import { useState } from 'react'
import AppButton from '../../components/AppButton'

import { useTestContract } from './useTestContract'

const TestContractMessage: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const { message, setMessage } = useTestContract()

  const onChange = (e): void => {
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
        <label className="block mb-2 text-sm font-bold text-left text-gray-700" htmlFor="username">
          New Message
          <input
            className="py-2 px-3 w-full leading-tight text-gray-700 rounded border focus:outline-none shadow appearance-none focus:shadow-outline"
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
