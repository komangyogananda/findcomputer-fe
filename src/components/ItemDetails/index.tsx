import React from 'react';
import { Grid, Box, Typography, makeStyles, createStyles, Paper, Theme, Avatar, Button } from '@material-ui/core';
import Navbar from '../Navbar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  margin: {
    marginBottom: "3rem",
  },
  paper: {
    padding: "2rem"
  },
  user: {
    padding: "1rem",
  },
  price: {
    color: theme.palette.primary.main
  },
  avatar: {
    width: "64px",
    height: "64px"
  }
}))

export default function ItemDetails(){
  const classes = useStyles()
  return <Grid container direction="row" justify="center">
    <Grid item xs={12} className={classes.margin}>
      <Navbar></Navbar>
    </Grid>
    <Grid item xs={10} md={5} className={classes.margin}>
      <h3>ImageHere</h3>
    </Grid>
    <Grid item xs={10} md={5} className={classes.margin}>
      <Paper variant="outlined" className={classes.paper}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h5" align="left">
              <Box fontWeight="fontWeightBold">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde totam porro vel aliquid deleniti facilis cumque, minus quaerat qui culpa a! Nam aperiam minus explicabo accusamus vitae eaque corporis facere?
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" align="left" className={classes.price}>
              <Box fontWeight="fontWeightBold">
                Rp. 100000
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="left">
              <Box>
                Description:
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="left">
              <Box>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ab incidunt explicabo eum inventore similique placeat quos nostrum! Porro quos repudiandae id. Fuga eveniet possimus odit quam labore sequi amet asperiores unde rerum, suscipit expedita soluta nulla debitis minima quo tempora veritatis ea repellendus ducimus repellat voluptatum saepe, qui, earum repudiandae. Placeat fuga sit ea maxime! Aspernatur sed quisquam laborum tempore dolores cumque quis, voluptatem eaque sequi perferendis! Mollitia repudiandae ipsa aliquid ex obcaecati nemo explicabo, deleniti necessitatibus. Animi eaque culpa corporis iure, saepe, consectetur porro labore ut cumque eum explicabo velit! Officia, nobis quam a ullam maxime voluptatem voluptates!
              </Box>
            </Typography>
          </Grid>
          <Grid item>
              <Paper variant="outlined" className={classes.user}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src="https://via.placeholder.com/250" className={classes.avatar} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      <Box fontWeight="fontWeightBold">
                        kulguy
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
          </Grid>
          <Grid item>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Button color="primary" variant="contained">Buy</Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained">Edit</Button>
              </Grid>
              <Grid item>
                <Button color="secondary" variant="contained">Delete</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>
}