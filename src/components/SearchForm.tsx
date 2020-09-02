import React, { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  makeStyles,
} from '@material-ui/core'
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
  const { setParams } = useContext(UsersContext)
  const onSubmit = (values) => {
    setParams(values)
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
    </form>
  )
}

export default SearchForm
