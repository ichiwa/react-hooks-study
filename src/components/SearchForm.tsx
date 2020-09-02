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
  const { setUserName } = useContext(UsersContext)
  const onSubmit = (values) => {
    setUserName(values.name)
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>User Search Form</h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            name="name"
            control={control}
            defaultValue=""
            fullWidth
            label="Username"
          />
        </Grid>
        {/*
        <Grid item xs={12}>
          <Controller
            as={Select}
            name="gender"
            control={control}
            defaultValue=""
            fullWidth
          >
            <MenuItem value="">Both</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Controller>
        </Grid>
        */}
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
