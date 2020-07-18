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

const ServerError: FC = () => {
  const classes = useStyles()
  const history = useHistory()
  return <Grid container style={{height: "100vh"}} direction="column" justify="center" alignItems="center">
    <Grid item className={classes.colorPrimary}>
      <Typography variant="h1">
        <Box fontWeight="fontWeightBold">
          500
        </Box>
      </Typography>
    </Grid>
    <Grid item className={classes.colorPrimary}>
      <Typography variant="h3">
        <Box>
          Sorry! Our server is gone
        </Box>
      </Typography>
    </Grid>
    <Grid item>
      <Button color="primary" variant="contained" onClick={() => history.push('/explore')}>Explore</Button>
    </Grid>
  </Grid>
}

export default ServerError;