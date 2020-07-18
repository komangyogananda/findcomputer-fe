import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, makeStyles, InputLabel, createStyles, Paper, Theme, Avatar, Button, Card, CardActionArea, InputAdornment, MenuItem, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Navbar from '../Navbar';
import { useParams, useHistory } from 'react-router-dom';
import {getItem} from '../../api'
import LoadingPage from '../LoadingPage';
import StateContainer from '../../store';
import { Formik, Form, Field } from 'formik';
import {TextField, Select} from 'formik-material-ui'
import {editItem, deleteItem, buyItem} from '../../api'
import * as Yup from 'yup'

const Carousel = require('react-material-ui-carousel').default

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
  },
  image: {
    width: "80%",
    marginBottom: "1rem",
    objectFit: "cover"
  }
}))
interface IItems {
  id: number;
  username: string;
  title: string;
  description: string;
  category: string;
  price: number
}

const EditItemSchema = Yup.object().shape({
  title: Yup.string().min(4, "Too short").required("Required"),
  description: Yup.string().min(5, 'Too short').max(255, 'Too long (Max 255)').required("Required"),
  category: Yup.string().oneOf(['ram', 'processor', 'storage', 'motherboard', 'vga']).required("Required"),
  price: Yup.number().required("Required")
})

export default function ItemDetails(){
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(true)
  const [item, setItem] = useState<IItems>()
  const {loggedIn, username} = StateContainer.useContainer()
  const [onEdit, setOnEdit] = useState<boolean>(false)
  const [onDelete, setOnDelete] = useState<boolean>(false)
  const [onBuy, setOnBuy] = useState<boolean>(false)

  const handleCloseDialog = () => {
    if (onDelete){
      setOnDelete(false)
    }else if (onBuy){
      setOnBuy(false)
    }
  }

  const handleActionDialog = () => {
    if (onDelete){
      deleteItem(item?.id || 0)
        .then(response => {
          history.push('/explore')
        })
        .catch(error => {

        })
    }else if (onBuy){
      buyItem(item?.id || 0)
        .then(response => {
          console.log("[DEBUG]: handleActionDialog -> response", response)
          history.push('/explore')
        })
    }
  }

  useEffect(() => {
    getItem(id)
      .then((response) => {
        setItem(response.data)
        setLoading(false)
      })
      .catch(() => {
        history.push('/404')
      })
  }, [id])
  return (loading || item == null) ? <LoadingPage></LoadingPage> : <Grid container direction="row" justify="center">
    <Grid item xs={12} className={classes.margin}>
      <Navbar></Navbar>
    </Grid>
    <Grid item xs={10} md={5} className={`${classes.margin} ${classes.paper}`}>
        <Carousel navButtonsAlwaysVisible={true}>
          <div>
              <img className={classes.image} src="https://via.placeholder.com/600" key="1" alt="item" />
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat optio doloribus id modi totam atque, at nobis fuga architecto accusantium alias excepturi perferendis molestias eius! Eligendi, incidunt natus. Aliquid, animi!
              </Typography>
          </div>
          <div>
              <img className={classes.image} src="https://via.placeholder.com/600" key="2" alt="item" />
              <p>Legend 2</p>
          </div>
        </Carousel>
    </Grid>
    <Grid item xs={10} md={5} className={classes.margin}>
      <Formik
        initialValues={{
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
        }}
        validationSchema={EditItemSchema}
        onSubmit={(values, {setSubmitting}) => {
          editItem(values, item.id)
            .then(response => {
              setItem({
                ...item,
                ...values
              })
              console.log("[DEBUG]: ItemDetails -> response", response)
            })
            .catch(error => {

            })
            .finally(() => {
              setSubmitting(false)
              setOnEdit(false)
            })

        }}
      >
        {({submitForm, isSubmitting}) => (
          <Form>
            <Paper variant="outlined" className={classes.paper}>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  {onEdit ? <Field
                    component={TextField}
                    name="title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Title"
                  /> : <Typography variant="h5" align="left">
                    <Box fontWeight="fontWeightBold">
                      {item?.title}
                    </Box>
                  </Typography>}
                </Grid>
                <Grid item>
                  {onEdit ? <Field 
                    component={TextField}
                    name="price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Price"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                    }}
                  />: <Typography variant="h3" align="left" className={classes.price}>
                    <Box fontWeight="fontWeightBold">
                      Rp. {item?.price}
                    </Box>
                  </Typography>}
                </Grid>
                <Grid item>
                  {onEdit ? 
                  <FormControl
                    fullWidth
                    size="small"
                    variant="outlined"
                  >
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Field
                      component={Select}
                      label="Category"
                      name="category"
                      fullWidth
                      variant="outlined"
                      size="small"
                      >
                      <MenuItem value="ram">Ram</MenuItem>
                      <MenuItem value="processor">Processor</MenuItem>
                      <MenuItem value="motherboard">Motherboard</MenuItem>
                      <MenuItem value="vga">VGA</MenuItem>
                      <MenuItem value="storage">Storage</MenuItem>
                    </Field> 
                  </FormControl>
                  : <Typography variant="body1" align="left" className={classes.price}>
                    <Box fontWeight="fontWeightBold">
                      Category: {item?.category}
                    </Box>
                  </Typography>}
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="left">
                    <Box>
                      Description:
                    </Box>
                  </Typography>
                </Grid>
                <Grid item>
                  {onEdit ? <Field
                    component={TextField}
                    name="description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Description"
                    multiline
                    rows={3}
                  /> : <Typography variant="body1" align="left">
                    <Box>
                      {item?.description}
                    </Box>
                  </Typography>}
                </Grid>
                <Grid item>
                    <Card variant="outlined" onClick={() => history.push(`/account/${item?.username}`)}>
                      <CardActionArea className={classes.user}>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                          <Grid item>
                            <Avatar alt="Remy Sharp" src="https://via.placeholder.com/250" className={classes.avatar} />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              <Box fontWeight="fontWeightBold">
                                {item?.username}
                              </Box>
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardActionArea>
                    </Card>
                </Grid>
                {loggedIn ? <Grid item>
                  <Grid container justify="flex-end" spacing={2}>
                    {username != item?.username && <Grid item>
                      <Button 
                        color="primary" 
                        variant="contained"
                        onClick={() => setOnBuy(true)}
                      >
                        Buy
                      </Button>
                    </Grid>}
                    {username === item?.username && <Grid item>
                      {onEdit ? <Button color="primary" variant="contained" onClick={submitForm}>Submit</Button> : 
                      <Button 
                        color="primary" 
                        variant="contained"
                        onClick={() => setOnEdit(true)}
                      >
                        Edit
                      </Button>}
                    </Grid>}
                    {username === item?.username && <Grid item>
                      {onEdit ? <Button color="secondary" variant="contained" onClick={() => setOnEdit(false)}>Cancel</Button>:
                      <Button 
                        color="secondary" 
                        variant="contained"
                        onClick={() => setOnDelete(true)}
                      >
                        Delete
                      </Button>}
                    </Grid>}
                  </Grid>
                </Grid> : <Grid item>
                  <Typography variant="body1" align="right">
                    <Box>
                      Login to buy
                    </Box>
                  </Typography>
                </Grid>}
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </Grid>
    <Dialog open={onDelete || onBuy} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <Box margin={2}>
        {onDelete && <DialogTitle id="delete-confirmation-dialog">Delete Confirmation</DialogTitle>}
        {onBuy && <DialogTitle id="delete-confirmation-dialog">Buy Confirmation</DialogTitle>}
        <DialogContent>
          {onDelete && <DialogContentText>
            Are you sure want to delete <strong>{item.title}</strong> ?
          </DialogContentText>}
          {onBuy && <DialogContentText>
            Are you sure want to buy <strong>{item.title}</strong> ?
          </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleActionDialog} color={onBuy ? "primary" : "secondary"} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  </Grid>
}