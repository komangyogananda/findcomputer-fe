import React from 'react';
import { Grid, makeStyles, createStyles, Paper, Typography, Box } from '@material-ui/core';
import Navbar from '../Navbar';
import Search from '../Search';
import Filter from '../Filter';
import ItemCard from '../ItemCard';

const useStyles = makeStyles(() => createStyles({
  pad: {
    padding: "1rem"
  },
  itemsection: {
     height: "100vh",
  },
  root: {
    flexGrow: 1
  }
}))

export default function ExplorePage(){
  const classes = useStyles()
  return <Grid container justify="center">
    <Grid item xs={12}>
      <Navbar></Navbar>
    </Grid>
    <Grid item xs={12} md={12}>
      <Grid container direction="row" justify="center">
        <Grid item xs={12} md={3} className={classes.pad}>
          <Paper variant="outlined">
            <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Typography variant="h4" className={classes.pad}>
                    <Box fontWeight="fontWeightBold">
                      Search
                    </Box>
                  </Typography>
                  <Search></Search>
                </Grid>
                <Grid item>
                  <Typography variant="h4" className={classes.pad}>
                    <Box fontWeight="fontWeightBold">
                      Filter
                    </Box>
                  </Typography>
                  <Filter></Filter>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <h4>Items</h4>
            </Grid>
            <Grid item xs={11}>
              <Grid container direction="row" className={classes.root} spacing={4} justify="center">
                <Grid item>
                  <ItemCard title="One line" price={100000} category="Ram" owner="JohnDue"></ItemCard>
                </Grid>
                <Grid item>
                  <ItemCard title="Multiple line anjay asek okasodkaoskdoakdosakodkoadoaskd" price={100000} category="Ram" owner="JohnDue"></ItemCard>
                </Grid>
                <Grid item>
                  <ItemCard title="adskdakdsoaksodas" price={100000} category="Ram" owner="JohnDue"></ItemCard>
                </Grid>
                <Grid item>
                  <ItemCard title="adnaojnsdaonsod" price={100000} category="Ram" owner="JohnDue"></ItemCard>
                </Grid>
                <Grid item>
                  <ItemCard title="sdklkdsafosdafoasdjfasdojfsadof" price={100000} category="Ram" owner="JohnDue"></ItemCard>
                </Grid>
                <Grid item>
                  <ItemCard title="sdklkdsafosdafoasdjfasdojfsadof" price={100000} category="Ram" owner="JohnDue"></ItemCard>
                </Grid>
                <Grid item>
                  <ItemCard title="sdklkdsafosdafoasdjfasdojfsadof" price={100000} category="Ram" owner="JohnDue"></ItemCard>
                </Grid>
                <Grid item>
                  <ItemCard title="sdklkdsafosdafoasdjfasdojfsadof" price={100000} category="Ram" owner="JohnDue"></ItemCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}