import React, { createContext, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'

export const Gender = {
  Male: 'male',
  FeMale: 'female',
}

type Gender = typeof Gender[keyof typeof Gender]

type User = {
  id: number
  username: string
  email: string
}

type Users = User[]

interface ContextProps {
  users: Users
  setUsers: (users: Users) => void
  setUserName: (username: string) => void
}

export const UsersContext = createContext<ContextProps | null>(null)

const url = 'https://jsonplaceholder.typicode.com/users'

const getKey = (url: string, username: string) =>
  !!username ? `${url}?username=${username}` : url

const UsersContextProvider: React.FC = (props: { children }) => {
  const [users, setUsers] = useState([])
  const [username, setUserName] = useState('')
  const children = props.children || null

  const findUsersFetcher = (url: string) => {
    return axios.get(url).then((res) => setUsers(res.data))
  }
  useSWR(getKey(url, username), findUsersFetcher)
  return (
    <UsersContext.Provider value={{ users, setUsers, setUserName }}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider
