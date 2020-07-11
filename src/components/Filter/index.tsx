import React from 'react'
import { Grid, makeStyles, createStyles, Typography, Box, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'

const useStyles = makeStyles(() => createStyles({
  root: {
    padding: "1rem",
  }
}))

export default function Filter(){
  const classes = useStyles()
  return <Grid container direction="column" className={classes.root}>
    <Typography variant="body1" align="left">
      <Box fontWeight="fontWeightBold">
        By Category 
      </Box>
    </Typography>
    <FormGroup row={true}>
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="ram"
            color="primary"
          />
        }
        label="RAM"
      />
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="processor"
            color="primary"
          />
        }
        label="Processor"
      />
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="vga"
            color="primary"
          />
        }
        label="VGA"
      />
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="motherboard"
            color="primary"
          />
        }
        label="Motherboard"
      />
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="storage"
            color="primary"
          />
        }
        label="Storage"
      />
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name="all"
            color="primary"
          />
        }
        label="All"
      />
    </FormGroup>
  </Grid>
}