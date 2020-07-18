import React, { useState } from 'react';
import { Grid, Box, Typography, Theme, Button, Snackbar } from '@material-ui/core';
import { makeStyles,createStyles } from '@material-ui/styles';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup';
import { postSignUp } from '../../api';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}))

const SignUpSchema = Yup.object().shape({
  username: Yup.string().min(4, 'Too short').max(30, 'Too long (Max 30) (Max 30)').required('Required'),
  name: Yup.string().min(4, 'Too short').max(30, 'Too long (Max 30)').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  telp: Yup.string().min(5, 'Too short').max(30, 'Too long (Max 30)').required("Required"),
  description: Yup.string().min(5, 'Too short').max(255, 'Too long (Max 255)').required("Required"),
  password: Yup.string().min(8, 'Too short').required("Required")
})

type SnackbarMessage = {
  message: String,
  date: Date,
  severity: String,
}

export default function SignUp(){
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState<SnackbarMessage>({ message: "", date: new Date(), severity: ''})
  const setSuccessMessage = (message: String) => setSnackbar({ message: message, date: new Date(), severity: 'success' })
  const setErrorMessage = (message: String) => setSnackbar({ message: message, date: new Date(), severity: 'error' })
  return <Grid>
    <Typography variant="h6" align="center">
      <Box fontWeight="fontWeightBold">
        Come Join Us!
      </Box>
    </Typography>
    <Formik
      initialValues={{
        name: "",
        username: "",
        password: "",
        email: "",
        telp: "",
        description: ""
      }}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        postSignUp(values)
          .then(() => {
            setSuccessMessage("Success")
            resetForm()
          })
          .catch(error => {
            console.log("[DEBUG]: SignUp -> error", error.response)
            setErrorMessage(error.response.data.message || "Something went wrong")
          })
          .finally(() => {
            setSubmitting(false)
          })
      }}
      validationSchema={SignUpSchema}
    >
      {({submitForm, isSubmitting}) => (
        <Form className={classes.root}>
          <Field
            component={TextField}
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            label="Fullname"
          />
          <Field
            component={TextField}
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            label="Username"
          />
          <Field
            component={TextField}
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            size="small"
            label="Password"
          />
          <Field
            component={TextField}
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            size="small"
            label="Email"
          />
          <Field
            component={TextField}
            name="telp"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            label="Telephone Number"
          />
          <Field
            component={TextField}
            name="description"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            label="Description"
            multiline
            rows={2}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={isSubmitting}
            onClick={submitForm}
            style={{marginTop: '1rem'}}>
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
    {(snackbar !== null) ? <Snackbar open={snackbar.message !== ""} autoHideDuration={6000}>
      <Alert severity={snackbar.severity === "success" ? "success" : "error"}>
        {snackbar.message}
      </Alert>
    </Snackbar> : null}
  </Grid>
}