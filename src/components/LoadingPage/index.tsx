import React from 'react'
import { CircularProgress, Grid, makeStyles, createStyles, Typography, Box, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: "100vh",
    width: "100vw"
  },
  primary: {
    color: theme.palette.primary.main
  }
}))

const LoadingPage = () => {
  const classes = useStyles()
  return <Grid container direction="column" className={classes.root} justify="center" alignItems="center">
    <Grid item>
      <CircularProgress color="primary" />
    </Grid>
    <Grid item className={classes.primary}>
      <Typography variant="h4">
        <Box marginTop={4} fontWeight="fontWeightBold">
          please wait
        </Box>
      </Typography>
    </Grid>
  </Grid>
}

export default LoadingPage