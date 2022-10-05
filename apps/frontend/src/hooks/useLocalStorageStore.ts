/* eslint-disable @typescript-eslint/naming-convention */
import create from 'zustand'
import deepEqual from 'fast-deep-equal'
import config from '../lib/config'

type LocalStorageStore<StorageType> = {
  localStorageKey: string
  windowLocalStorage: typeof window.localStorage | undefined
  storage: StorageType
  _getLocalStorage: () => StorageType | undefined
  _loadLocalStorage: () => void
  _setLocalStorage: <T>(data: T) => void
  init: () => void
  setLocalStorage: (localStorageKey: keyof StorageType, value: unknown) => void
}

type LocalStorage = {
  connectedWallets?: string[]
}

const initLocalStorage: LocalStorage = {
  connectedWallets: undefined,
}

const useLocalStorageStore = create<LocalStorageStore<LocalStorage>>((set, get) => ({
  localStorageKey: config.LOCAL_STORAGE_ID,
  windowLocalStorage: undefined,
  storage: initLocalStorage,
  init: (): void => {
    const { _loadLocalStorage } = get()
    _loadLocalStorage()
    set({ windowLocalStorage: window.localStorage })
  },
  _loadLocalStorage: (): void => {
    const { _getLocalStorage, _setLocalStorage, storage } = get()
    const localStorage = _getLocalStorage()

    if (Object.keys(localStorage ?? {}).length > 0) {
      const isEqual = deepEqual(localStorage, storage)

      if (!isEqual) {
        const updatedState = {
          ...localStorage,
        }
        set({ storage: updatedState })
        _setLocalStorage(updatedState)
      }
    }
  },
  _getLocalStorage: (): LocalStorage | undefined => {
    const { localStorageKey, windowLocalStorage } = get()
    if (!windowLocalStorage) return undefined

    const jsonObject = windowLocalStorage.getItem(localStorageKey) || '{}'

    return JSON.parse(jsonObject)
  },
  _setLocalStorage: <DataType>(data: DataType): void => {
    const { windowLocalStorage, localStorageKey } = get()
    windowLocalStorage?.setItem(localStorageKey, JSON.stringify(data))
  },

  setLocalStorage: (localStorageKey: keyof LocalStorage, value: unknown): void => {
    const { _setLocalStorage, storage } = get()

    const updatedState = {
      ...storage,
      [localStorageKey]: value,
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    set({ storage: updatedState })
    _setLocalStorage(updatedState)
  },
}))

export default useLocalStorageStore
