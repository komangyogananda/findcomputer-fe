import React, { useState } from 'react';
import { Paper, Avatar, makeStyles, createStyles, Grid, Typography, Box, Button, Theme, Snackbar } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import {TextField} from 'formik-material-ui';
import * as Yup from 'yup'
import * as Lodash from 'lodash'
import { putUser } from '../../api';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {
    width: '128px',
    height: '128px',
    fontSize: '32px',
    background: `rgba(${Lodash.random(0, 255, false)}, ${Lodash.random(0, 255, false)}, ${Lodash.random(0, 255, false)})`
  },
  root: {
    padding: "1rem"
  },
  form: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}))

type IUserProfile = {
  id: number
  name: string
  username: string,
  description: string,
  telp: string,
  email: string,
  joinedAt: string,
}

const EditSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too short').max(30, 'Too long (Max 30) (Max 30)').required('Required'),
  name: Yup.string().min(2, 'Too short').max(30, 'Too long (Max 30)').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  telp: Yup.string().min(5, 'Too short').max(30, 'Too long (Max 30)').required("Required"),
  description: Yup.string().min(5, 'Too short').max(255, 'Too long (Max 255)').required("Required"),
})

export default function UserProfile(props: IUserProfile){
  const classes = useStyles()
  const { username: usernamevariable } = useParams()
  const [onEdit, setOnEdit] = useState<boolean>(false) 
  const [userProfile, setUserProfile] = useState<IUserProfile>(props)
  const [error, setError] = useState<string>("")
  const history = useHistory()
  return <Paper variant="outlined" className={classes.root}>
    <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
      <Grid item>
        <Avatar alt={`Avatar ${userProfile.username}`} className={classes.avatar}>{userProfile.username[0]}</Avatar>
      </Grid>
      <Grid item>
        <Formik
          initialValues={{
            id: userProfile.id,
            username: userProfile.username,
            name: userProfile.name,
            email: userProfile.email,
            telp: userProfile.telp,
            description: userProfile.description
          }}
          onSubmit={(values, {setSubmitting}) => {
            putUser(values)
            .then(response => {
              const {data} = response;
              setUserProfile(data)
              setOnEdit(false)
            })
            .catch(error => {
              setError(error.response.data.message)
            })
            .finally(() => {
              setSubmitting(false)
            })
          }}
          validationSchema={EditSchema}
        >
          {({submitForm, isSubmitting}) => (
            <Form className={classes.form}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h4">
                  <Box fontWeight="fontWeightBold">
                    { userProfile.username }
                  </Box>
                </Typography>
                {!onEdit ? <Typography variant="body1">
                  <Box>
                    { userProfile.name }
                  </Box>
                </Typography> : <Field 
                  component={TextField}
                  name="name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Fullname"
                />}
                {!onEdit ? <Typography variant="body1">
                  <Box>
                    { userProfile.email }
                  </Box>
                </Typography> : <Field 
                  component={TextField}
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Email"
                />}
                {!onEdit ? <Typography variant="body1">
                  <Box>
                    { userProfile.telp }
                  </Box>
                </Typography> : <Field 
                  component={TextField}
                  name="telp"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Telephone Number"
                />}
                <Typography variant="body1">
                  <Box style={{color: "grey"}}>
                    joined at { new Date(Date.parse(userProfile.joinedAt)).toDateString() }
                  </Box>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{color: "grey"}}>
                  <Box>
                    description:
                  </Box>
                </Typography>
                {!onEdit ? <Typography variant="body1">
                  <Box fontWeight="fontWeightMedium">
                    { userProfile.description }
                  </Box>
                </Typography> : <Field 
                  component={TextField}
                  name="description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Description"
                  multiline
                  rows={2}
                />}
              </Grid>
              {usernamevariable === "me" && <Grid item>
                <Grid container spacing={4} justify="center" alignItems="center">
                  <Grid item>
                    {!onEdit ? 
                    <Button color="primary" variant="contained" onClick={() => setOnEdit(true)}>Edit Profile</Button>
                    : <Button color="secondary" disabled={isSubmitting} variant="contained" onClick={() => setOnEdit(false)}>Cancel</Button>}
                  </Grid>
                  <Grid item>
                    {!onEdit ? <Button color="primary" variant="contained" onClick={() => history.push('/item/add')}>Add Items</Button>
                    : <Button color="primary" disabled={isSubmitting} onClick={submitForm} variant="contained">Submit</Button>}
                  </Grid>
                </Grid>
              </Grid>}
            </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      {error !== "" ? <Snackbar open={error !== ""} autoHideDuration={6000} onClose={() => setError("")}>
        <Alert onClose={() => setError("")} severity="error">
          {error}
        </Alert>
      </Snackbar> : null}
    </Grid>
  </Paper>
}