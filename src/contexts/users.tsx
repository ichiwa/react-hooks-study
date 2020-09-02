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
  setUsers: (users: Users) => void
  setParams: (params: { id: string; username: string }) => void
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

const UsersContextProvider: React.FC = (props: { children }) => {
  const [users, setUsers] = useState([])
  const [params, setParams] = useState({})
  const children = props.children || null

  const findUsersFetcher = (url: string) => {
    return axios.get(url).then((res) => setUsers(res.data))
  }
  useSWR(getKey(url, params), findUsersFetcher)
  return (
    <UsersContext.Provider value={{ users, setUsers, setParams }}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider
