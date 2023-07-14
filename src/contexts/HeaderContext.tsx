import { Component, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { createContext } from 'react'

type headerContextData = {
  headerType: 'main' | 'sub' | string
  setType: Dispatch<SetStateAction<string>>
}

type headerContextParameters = {
  children: ReactNode
}

export const headerContext = createContext({} as headerContextData)

export function HeaderContextProvider({ children }: headerContextParameters) {
  const [headerType, setType] = useState('main')

  return (
    <headerContext.Provider
      value={{
        headerType,
        setType,
      }}
    >
      {children}
    </headerContext.Provider>
  )
}
