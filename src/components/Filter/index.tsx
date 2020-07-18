import React, { useState } from 'react'
import { Grid, makeStyles, createStyles, Typography, Box, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'

const useStyles = makeStyles(() => createStyles({
  root: {
    padding: "1rem",
  }
}))

type FilterState = {
  ram: boolean,
  processor: boolean,
  storage: boolean,
  vga: boolean,
  motherboard: boolean,
  all: boolean,
}

type FilterProps = {
  onChange: (selected: String[]) => void,
  initialState: FilterState
}

export default function Filter({onChange, initialState}: FilterProps){
  const classes = useStyles()
  const [filter, setFilter] = useState<FilterState>(initialState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target
    const newFilter: any = {
      ...filter,
      [name]: checked,
    }
    setFilter(newFilter)
    let selected: String[] = []
    if (newFilter.all){
      selected = []
    }else{
      for (let key in newFilter) {
        let value = newFilter[key];
        if (value){
          selected.push(key)
        }
      }
    }
    onChange(selected)
  }
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
            checked={!filter.all && filter.ram}
            disabled={filter.all}
            onChange={handleChange}
            name="ram"
            color="primary"
          />
        }
        label="RAM"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={!filter.all && filter.processor}
            disabled={filter.all}
            onChange={handleChange}
            name="processor"
            color="primary"
          />
        }
        label="Processor"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={!filter.all && filter.vga}
            disabled={filter.all}
            onChange={handleChange}
            name="vga"
            color="primary"
          />
        }
        label="VGA"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={!filter.all && filter.motherboard}
            disabled={filter.all}
            onChange={handleChange}
            name="motherboard"
            color="primary"
          />
        }
        label="Motherboard"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={!filter.all && filter.storage}
            disabled={filter.all}
            onChange={handleChange}
            name="storage"
            color="primary"
          />
        }
        label="Storage"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filter.all}
            onChange={handleChange}
            name="all"
            color="primary"
          />
        }
        label="All"
      />
    </FormGroup>
  </Grid>
}