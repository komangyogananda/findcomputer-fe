import React, { useState } from 'react';
import { Container, Box, Typography, Theme, Button, Snackbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import StateContainer from '../../store';
import { Formik, Form, Field } from 'formik';
import { postLogin } from '../../api';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}))

type LoginCreds = {
  username: String,
  password: String
};

export default function Login(){
  const classes = useStyles();
  const {login} = StateContainer.useContainer()
  const history = useHistory()
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [errorPost, setErrorPost] = useState<string>("")
  return <Container>
    <Typography variant="h6" align="center">
      <Box fontWeight="fontWeightBold">
        Welcome Back
      </Box>
    </Typography>
    <Formik
      initialValues={{
        'username': '',
        'password': ''
      }}
      validate={values => {
        const errors: Partial<LoginCreds> = {};
        if (!values.username) {
          errors.username = 'Required';
        }
        if (!values.password){
          errors.password = 'Required'
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        postLogin(values.username, values.password)
          .then(response => {
            if (response.status === 200){
              const { data } = response
              const { accessToken } = data
              login(accessToken, values.username)
              history.push('/explore')
            }
          })
          .catch((error) => {
            setOpenSnackbar(true)
            setErrorPost(error.response.data.message)
          })
          .finally(() => {
            setSubmitting(false)
          })
      }}
    >
      {({submitForm, isSubmitting}) => (
        <Form className={classes.root}>
          <Field
            component={TextField}
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            label="Username"
          />
          <br></br>
          <Field
            component={TextField}
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            size="small"
            label="Password"
          />
          <br></br>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={isSubmitting}
            onClick={submitForm}
            style={{marginTop: '1rem'}}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
      <Alert onClose={() => setOpenSnackbar(false)} severity="error">
        {errorPost}
      </Alert>
    </Snackbar>
  </Container>
}