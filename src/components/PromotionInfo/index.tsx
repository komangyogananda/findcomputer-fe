import React from 'react';
import { Container, Typography, Box, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: "12px"
  }
}))

export default function PromotionInfo(){
  const classes = useStyles()
  return <Container>
    <Typography variant="h4" className={classes.root}>
      <Box fontWeight="fontWeightBold">
        Benefits of joining find computer
      </Box>
    </Typography>
    <Typography variant="h6" align="center">
        Completely <strong>free</strong>
    </Typography>
    <Typography variant="h6" align="center">
        <strong>Wide</strong> community
    </Typography>
    <Typography variant="h6" align="center">
        <strong>Easy</strong> to set up
    </Typography>
  </Container>
}