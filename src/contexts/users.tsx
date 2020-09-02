import React, { createContext, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'

type User = {
  id: number
  username: string
  email: string
}

type Users = User[]

interface ContextProps {
  users: Users
  message: string | null
  error: Error
  setParams: (params: { id: string; username: string }) => void
  setMessage: (message: string) => void
}

export const UsersContext = createContext<ContextProps | null>(null)

const url = 'https://jsonplaceholder.typicode.com/users'

const removeEmpty = (obj) =>
  Object.entries(obj).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

const getKey = (
  url: string,
  params: Partial<{ id: string; username: string }>
) => {
  const urlSearchParams = new URLSearchParams(removeEmpty(params))
  return `${url}?${urlSearchParams.toString()}`
}

const findUsersFetcher = (url: string) => {
  return axios.get(url).then((res) => res.data)
}

const UsersContextProvider: React.FC = (props: { children }) => {
  const [params, setParams] = useState({})
  const [message, setMessage] = useState('')
  const children = props.children || null

  const result = useSWR(getKey(url, params), findUsersFetcher)
  return (
    <UsersContext.Provider
      value={{
        users: result.data,
        message: result.error
          ? result.error.message
          : result.data
          ? 'Search successed.'
          : null,
        error: result.error,
        setParams,
        setMessage,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider
