import React, { FC } from 'react';
import { Grid, Typography, Box, Button, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => createStyles({
  colorPrimary: {
    color: theme.palette.primary.main,
    marginBottom: "1rem"
  }
}))

const NotFoundRoute: FC = () => {
  const classes = useStyles()
  const history = useHistory()
  return <Grid container style={{height: "100vh"}} direction="column" justify="center" alignItems="center">
    <Grid item className={classes.colorPrimary}>
      <Typography variant="h1">
        <Box fontWeight="fontWeightBold">
          404
        </Box>
      </Typography>
    </Grid>
    <Grid item className={classes.colorPrimary}>
      <Typography variant="h3">
        <Box>
          Page not found
        </Box>
      </Typography>
    </Grid>
    <Grid item>
      <Button color="primary" variant="contained" onClick={() => history.push('/')}>Explore</Button>
    </Grid>
  </Grid>
}

export default NotFoundRoute;