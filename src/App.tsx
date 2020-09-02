import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import SearchForm from './components/SearchForm'
import UserTable from './components/UserTable'
import UsersContextProvider from './contexts/users'

const App: React.FC = () => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Hello React-hooks
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md">
        <UsersContextProvider>
          <SearchForm />
          <UserTable />
        </UsersContextProvider>
      </Container>
    </>
  )
}

export default App
