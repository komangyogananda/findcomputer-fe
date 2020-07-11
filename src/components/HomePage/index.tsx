import React, {useState} from 'react';
import { Grid, Theme, Typography, Box} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { CSSTransition } from 'react-transition-group'
import Login from '../Login';
import SignUp from '../SignUp';
import { COLORS } from '../constants';
import PromotionInfo from '../PromotionInfo';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: "100vh"
  },
  leftSection: {
    background: theme.palette.primary.main,
    color: "white"
  },
  marginStyle: {
    padding: '1rem',
  },
  rightSection: {
  },
  navbar: {
    paddingRight: "2rem",
    cursor: "pointer",
    "&:hover": {
      color: COLORS.PrimaryMain,
      transition: "color 0.3s ease"
    }
  }
}))

export default function HomePage() {
  const classes = useStyles();
  const [joinMethod, setJoinMethod] = useState(true);
  const [showPromotion, setShowPromotion] = useState(true)

  return <Grid container alignItems="center" justify="center" direction="row">
    <Grid 
      item
      xs={12} 
      md={5} 
      className={classes.leftSection}
    >
      <Grid container direction="column" alignItems="center" justify="center" className={`${classes.root}`}>
        <Box>
          <Typography variant="h3">
            <Box fontWeight="fontWeightBold">
              find<br></br>computer
            </Box>
          </Typography>
          <Typography variant="body1" className={classes.marginStyle}>hassle free solution for you to <strong>buy</strong> or <strong>sell</strong> computers</Typography>
        </Box>
      </Grid>
    </Grid>
    <Grid item xs={12} md={7} className={classes.rightSection}>
      <Grid container className={classes.root} alignItems="flex-start" justify="center">
        <Grid container justify="flex-end">
          <Grid item className={classes.navbar} onClick={() => {
              setShowPromotion(false)
              setJoinMethod(true)
            }}>
            <h3>Login</h3>
          </Grid>
          <Grid item className={classes.navbar} onClick={() => {
              setShowPromotion(false)
              setJoinMethod(false)
            }}>
            <h3>SignUp</h3>
          </Grid>
        </Grid>
        <Grid item xs={10} md={8}>
          <CSSTransition
            in={showPromotion}
            timeout={300}
            classNames={{
              appear: 'animate__bounceIn',
              enter: 'animate__bounceIn',
              exit: 'animate__bounceOut',
            }}
          >
            {showPromotion ? <PromotionInfo></PromotionInfo> :
            <CSSTransition
            in={joinMethod}
            timeout={300}
            classNames={{
              appear: 'animate__bounceIn',
              enter: 'animate__bounceIn',
              exit: 'animate__bounceOut',
            }}
            >
              {joinMethod ? <Login></Login> : <SignUp></SignUp>}
            </CSSTransition>}
          </CSSTransition>
        </Grid>
      </Grid>
    </Grid>
  </Grid>;
}