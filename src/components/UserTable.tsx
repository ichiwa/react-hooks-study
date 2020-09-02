import React, { useContext } from 'react'
import {
  Table,
  makeStyles,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import { UsersContext } from '../contexts/users'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const UserTable: React.FC = () => {
  const classes = useStyles()
  const { users } = useContext(UsersContext)

  return (
    <>
      <h3>Users</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.username}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserTable
