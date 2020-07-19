import React from 'react';
import { AppBar, Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { COLORS } from '../constants';
import StateContainer from '../../store';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => createStyles({
  root: {
    padding: "1rem",
  },
  navitem: {
    cursor: "pointer",
    "&:hover": {
      color: COLORS.PrimaryMain,
      background: "white",
      transition: "0.3s ease"
    }
  }
}));

export default function Navbar() {
  const classes = useStyles()
  const { loggedIn, logout } = StateContainer.useContainer()
  const history = useHistory()
  let profileSection;
  if (loggedIn){
    profileSection = [
      <Grid item className={classes.navitem} onClick={() => history.push('/account/me')}>
        <Typography>
          profile
        </Typography>
      </Grid>,
      <Grid item className={classes.navitem} onClick={() => {
        logout()
        history.push('/')
      }}>
        <Typography>
          log out
        </Typography>
      </Grid>,
    ]
  }else{
    profileSection = [
      <Grid item className={classes.navitem} onClick={() => history.push('/')}>
        <Typography>
          login
        </Typography>
      </Grid>,
      <Grid item className={classes.navitem} onClick={() => history.push('/')}>
        <Typography>
          signup
        </Typography>
    </Grid>
    ]
  }
  return <AppBar className={classes.root} position="sticky">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4} style={{cursor: "pointer"}} onClick={() => history.push('/explore')}>
          <Grid container direction="row" justify="flex-start">
            <Typography>
              <Box fontWeight="fontWeightBold">
                find computer
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="row" justify="flex-end" spacing={4}>
            <Grid item className={classes.navitem} onClick={() => history.push('/explore')}>
              <Typography>
                home
              </Typography>
            </Grid>
            {profileSection}
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  
}