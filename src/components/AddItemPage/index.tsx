import React, { useState } from 'react';
import { Grid, makeStyles, Theme, createStyles, Typography, Box, Button, FormControl, InputLabel, MenuItem, Paper, Snackbar } from '@material-ui/core';
import Navbar from '../Navbar';
import AddIcon from '@material-ui/icons/AddCircle'
import { Alert } from '@material-ui/lab'
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui'
import { addItem } from '../../api'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom';

const Files = require('react-butterfiles').default

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  newImage: {
    width: "128px",
    height: "128px",
  },
  image: {
    width: "128px",
    height: "128px",
    objectFit: "cover",
    "&:hover": {
      opacity: 0.5
    }
  }
}))

interface IImageRequest {
  base64: string;
  filename: string;
}

const NewItemValidationSchema = Yup.object().shape({
  title: Yup.string().min(4, 'Too Short').max(255, 'Too long').required("Required"),
  price: Yup.number().positive().required("Required"),
  category: Yup.string().oneOf(["ram", "storage", "vga", "motherboard", "processor"]),
  description: Yup.string().min(4, 'Too Short').max(255, "Too Long").required("Required"),
})

export default function AddItemPage() {

  const [images, setImages] = useState<IImageRequest[]>([])
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [error, setError] = useState<String>("")
  const history = useHistory()

  const handleError = (error: any) => {
    if (error[0].type === "maxSizeExceeded"){
      setError("Size larger than 500KB")
    }else{
      setError("Something Went Wrong.")
    }
    setOpenSnackbar(true)
  }

  const handleSuccess = (files: any) => {
    let newImages: IImageRequest[] = files.map((file: any) => {
      return {
        'base64': file.src.base64,
        'filename': file.name 
      }
    })
    setImages([...images, ...newImages])
  }
  
  const removeImage = (index: number) => {
    console.log("[DEBUG]: removeImage -> index", index)
    let newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const classes = useStyles()
  return <Grid container justify="center">
    <Grid item xs={12}>
      <Navbar></Navbar>
    </Grid>
    <Grid item xs={10} style={{marginTop: "2rem", marginBottom: "2rem"}}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3">
            <Box fontWeight="fontWeightBold">
              Add New Item
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={10} md={8} justify="center">
          <Formik
            initialValues={{
              title: "",
              price: 0,
              category: 'ram',
              description: '',
            }}
            validationSchema={NewItemValidationSchema}
            onSubmit={(values, {setSubmitting}) => {
              addItem({
                ...values,
                images: images
              })
                .then((response) => {
                  history.push('/account/me')
                })
                .catch(error => {
                  setError(error.response.data.message)
                  setOpenSnackbar(true)
                })
                .finally(() => {
                  setSubmitting(false)
                })
            }}
          >
            {({submitForm, isSubmitting}) => (
              <Form className={classes.root}>
                <Field
                  component={TextField}
                  name="title"
                  type="text"
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Title"
                >
                </Field>
                <Field
                  component={TextField}
                  name="price"
                  type="number"
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Price"
                >
                </Field>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Field
                    fullWidth
                    component={Select}
                    label="Category"
                    name="category"
                  >
                    <MenuItem value="ram">Ram</MenuItem>
                    <MenuItem value="processor">Processor</MenuItem>
                    <MenuItem value="motherboard">Motherboard</MenuItem>
                    <MenuItem value="vga">VGA</MenuItem>
                    <MenuItem value="storage">Storage</MenuItem>
                  </Field>
                </FormControl>
                <Field
                  component={TextField}
                  name="description"
                  type="text"
                  fullWidth
                  size="small"
                  variant="outlined"
                  multiline
                  rows={2}
                  label="Description"
                >
                </Field>
                <Grid item>
                  <Typography variant="body1" align="left">
                    <Box >
                      Add Images
                    </Box>
                  </Typography>
                  <Typography variant="subtitle2" align="left">
                    <Button color="primary" disableRipple={true} disableFocusRipple={true} disableTouchRipple={true}>
                      4 Images max
                    </Button>
                    <Button color="primary" disableRipple={true} disableFocusRipple={true} disableTouchRipple={true}>
                      500KB max each
                    </Button>
                    <Button color="primary" disableRipple={true} disableFocusRipple={true} disableTouchRipple={true}>
                      Images cannot edited after
                    </Button>
                    <Button color="secondary" disableRipple={true} disableFocusRipple={true} disableTouchRipple={true}>
                      Click to remove
                    </Button>
                  </Typography>
                </Grid>
                <Grid container>
                  <Files
                    multiple
                    convertToBase64
                    accept={["image/jpg", "image/jpeg", "image/png"]}
                    onError={(errors: any) => handleError(errors)}
                    onSuccess={(files: any) => handleSuccess(files)}
                    maxSize="500KB"
                  >
                    {({browseFiles}: any) => (
                      <Grid container spacing={2}>
                        { images.map((image, index) => <Grid item>
                          <Paper variant="outlined" key={`uploaded-${index}`} className={classes.image} onClick={() => removeImage(index)}>
                            <img src={image.base64} className={classes.image} alt="item"/>
                          </Paper>
                        </Grid>)}
                        { images.length < 4 && <Grid item>
                          <Paper
                              className={classes.newImage}
                              variant="outlined"
                              onClick={() => {
                                  browseFiles();
                              }}
                          >
                            <Grid container justify="center" alignItems="center" style={{height: "100%"}}>
                              <AddIcon fontSize="large" color="primary"></AddIcon>
                            </Grid>
                          </Paper>
                        </Grid>}
                      </Grid>
                    )}
                  </Files>
                </Grid>
                <Grid container direction="row" justify="flex-end" alignItems="center">
                  <Grid item>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      disabled={isSubmitting} 
                      style={{marginTop: '1rem'}}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
      <Alert onClose={() => setOpenSnackbar(false)} severity="error">
        {error}
      </Alert>
    </Snackbar>
  </Grid>
}