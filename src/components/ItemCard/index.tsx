import React from 'react';
import { Card, Grid, Typography, Box, makeStyles, createStyles, Theme, CardActionArea, CardMedia, CardContent, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: "1rem",
  },
  card: {
    width: "280px"
  },
  price: {
    color: theme.palette.primary.main
  }
}))

type itemCardProps = {
  title: string,
  price: Number,
  category: String,
  owner: String,
  image: string
}

export default function ItemCard({title, price, category, owner, image}: itemCardProps){
  const classes = useStyles()
  return <Card variant="elevation" className={classes.card} raised={false}>
    <CardActionArea className={classes.root}>
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={image || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQBY-YZl7MNp5apNCutue3ZJl0jGPT1wZyJQ&usqp=CAU"}
        title={title}
      />
      <CardContent>
        <Grid direction="column">
          <Grid item>
            <Typography variant="body1" align="left" noWrap={true}>
              <Box fontWeight="fontWeightMedium">
                { title }
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" align="left" className={classes.price} noWrap={true}>
              <Box fontWeight="fontWeightBold">
                Rp. { price }
              </Box>
            </Typography>
          </Grid>
          <Grid container direction="row" spacing={2} alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="caption" align="left">
                <Box>
                  { owner }
                </Box>
              </Typography>
            </Grid>
            <Grid item>
            <Chip
              label={`${category}`}
              clickable
              size="small"
              color="primary"
            />
            </Grid>
          </Grid>
        </Grid>        
      </CardContent>
    </CardActionArea>
  </Card>
}