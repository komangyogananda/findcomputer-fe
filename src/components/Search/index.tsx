import React from 'react'
import { Grid, makeStyles, createStyles, InputBase, Theme, fade, Button } from '@material-ui/core'
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  searchBar: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    marginLeft: 0,
    width: '100%',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}))

export default function SearchAndFilter(){
  const classes = useStyles()
  return <Grid container direction="column" className={classes.root}>
    <Grid item className={classes.searchBar}>
      <Grid container direction="row" justify="space-between" className={classes.root}>
        <Grid item>
          <InputBase
            placeholder="Search your desired items"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Grid>
        <Grid item>
          <Button color="primary" disableRipple>Search</Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}