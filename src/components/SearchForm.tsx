import React, { useContext, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  Grid,
  makeStyles,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { UsersContext } from './../contexts/users'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SearchForm: React.FC = () => {
  const classes = useStyles()
  const { handleSubmit, control } = useForm()
  const { setParams, message, setMessage, error } = useContext(UsersContext)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (message) {
      setOpen(true)
    }
  }, [message])
  const onSubmit = (values) => {
    setParams(values)
  }
  const handleClose = () => {
    setMessage(null)
    setOpen(false)
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>User Search Form</h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            name="id"
            control={control}
            defaultValue=""
            fullWidth
            label="ID"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            name="username"
            defaultValue=""
            control={control}
            fullWidth
            label="Username"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <>
          {!error && <Alert severity="info">{message}</Alert>}
          {error && <Alert severity="error">{message}</Alert>}
        </>
      </Snackbar>
    </form>
  )
}

export default SearchForm
