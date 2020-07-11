import React from 'react';
import { Paper, Avatar, makeStyles, createStyles, Grid, Typography, Box, Button } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  avatar: {
    width: '128px',
    height: '128px'
  },
  root: {
    padding: "1rem"
  }
}))

type UserProfileProps = {
  username: String,
  description: String,
  telp: String,
  email: String,
}

export default function UserProfile({username, description, email, telp}: UserProfileProps){
  const classes = useStyles()
  return <Paper variant="outlined" className={classes.root}>
    <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
      <Grid item>
        <Avatar alt="Remy Sharp" src="https://via.placeholder.com/250" className={classes.avatar} />
      </Grid>
      <Grid item>
        <Typography variant="h4">
          <Box fontWeight="fontWeightBold">
            { username }
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            { email }
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box>
            { telp }
          </Box>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" style={{color: "grey"}}>
          <Box>
            description:
          </Box>
        </Typography>
        <Typography variant="body1">
          <Box fontWeight="fontWeightMedium">
            { description }
          </Box>
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={4}>
          <Grid item>
            <Button color="primary" variant="contained">Edit Profile</Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained">Add Items</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
}