import React, { useState } from 'react';
import { Grid, makeStyles, Theme, createStyles, Typography, Box, TextField, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem, Paper, Snackbar } from '@material-ui/core';
import Navbar from '../Navbar';
import AddIcon from '@material-ui/icons/AddCircle'
import { Alert } from '@material-ui/lab'

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

export default function AddItemPage() {

  const [images, setImages] = useState<any[]>([])
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [error, setError] = useState<String>("")

  const handleError = (error: any) => {
    if (error[0].type === "maxSizeExceeded"){
      setError("Size larger than 500KB")
    }else{
      setError("Something Went Wrong.")
    }

    setOpenSnackbar(true)
  }

  const handleSuccess = (files: any) => {
    console.log("[DEBUG]: handleSuccess -> files", files)
    setImages([...images, ...files])
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
          <form className={classes.root}>
            <TextField size="small" fullWidth required type="text" id="title" label="Title" variant="outlined" />
            <TextField size="small" 
              fullWidth 
              required 
              type="number" 
              id="price" 
              label="Price" 
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
              }}
            />
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                fullWidth
                value={"ram"}
                // onChange={handleChange}
                label="Category"
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
              >
                <MenuItem value="ram">Ram</MenuItem>
                <MenuItem value="processor">Processor</MenuItem>
                <MenuItem value="motherboard">Motherboard</MenuItem>
                <MenuItem value="vga">VGA</MenuItem>
                <MenuItem value="storage">Storage</MenuItem>
              </Select>
            </FormControl>
            <TextField size="small" fullWidth required type="text" multiline rows={3} id="description" label="Description" variant="outlined" />
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
                        <img src={image.src.base64} className={classes.image} alt="item"/>
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
                <Button type="submit" variant="contained" color="primary" style={{marginTop: '1rem'}}>
                  Upload
                </Button>
              </Grid>
            </Grid>
          </form>
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