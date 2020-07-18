import React from 'react'
import { Typography, Box, makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  primary: {
    color: theme.palette.primary.main
  }
}))

const SearchNotFound = () => {
  const classes = useStyles()
  return <Box margin={4}>
    <Typography variant="h3" className={classes.primary}>
      <Box fontWeight="fontWeightBold">
        Oopss its empty
      </Box>
    </Typography>
    <Typography variant="body1" className={classes.primary}>
      <Box fontWeight="fontWeightBold">
        try other search
      </Box>
    </Typography>
  </Box>
}

export default SearchNotFound;