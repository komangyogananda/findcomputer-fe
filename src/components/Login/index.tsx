import React from 'react';
import { Container, Box, Typography, Theme, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}))

export default function Login(){
  const classes = useStyles();
  return <Container>
    <Typography variant="h6" align="center">
      <Box fontWeight="fontWeightBold">
        Welcome Back
      </Box>
    </Typography>
    <form className={classes.root}>
      <TextField size="small" fullWidth required type="text" id="username" label="Username" variant="outlined" />
      <TextField size="small" fullWidth required type="password" id="password" label="Password" variant="outlined" />
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Grid item>
          <Button type="submit" variant="contained" color="primary" style={{marginTop: '1rem'}}>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  </Container>
}