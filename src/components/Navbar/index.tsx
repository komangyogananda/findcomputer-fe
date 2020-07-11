import React from 'react';
import { AppBar, Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { COLORS } from '../constants';

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
  return <AppBar className={classes.root} position="sticky">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4}>
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
            <Grid item className={classes.navitem}>
              <Typography>
                home
              </Typography>
            </Grid>
            <Grid item className={classes.navitem}>
              <Typography>
                profile
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  
}