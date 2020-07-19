import React, { useState } from 'react'
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
  },
}))

type ISearchProps = {
  onSearch: (qs: String) => void,
  initialSearch: string,
  loading?: boolean,
}

export default function Search({onSearch, initialSearch, loading = false}: ISearchProps){
  const [query, setQuery] = useState<String>(initialSearch)
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
            value={query}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            disabled={loading}
          />
        </Grid>
        <Grid item>
          <Button color="primary" disabled={loading} disableRipple onClick={
            () => {
              onSearch(query)
            }
          }>Search</Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}