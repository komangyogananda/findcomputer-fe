import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, createStyles, Paper, Typography, Box } from '@material-ui/core';
import Navbar from '../Navbar';
import Search from '../Search';
import Filter from '../Filter';
import ItemCard from '../ItemCard';
import UserProfile from '../UserProfile';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getUserProfile, getItems } from '../../api';
import queryString from 'query-string'
import { Pagination } from '@material-ui/lab';
import { useItemsPagination } from '../../hooks';
import LoadingPage from '../LoadingPage';
import SearchNotFound from '../SearchNotFound';
import StateContainer from '../../store';

const useStyles = makeStyles(() => createStyles({
  pad: {
    padding: "1rem"
  },
  itemsection: {
     height: "100vh",
  },
  root: {
    flexGrow: 1
  }
}))

interface IUserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  telp: string;
  description: string;
  joinedAt: string;
}

export default function AccountPage(){
  const classes = useStyles()
  const { username } = useParams()
  const [userProfile, setUserProfile] = useState<IUserProfile>()
  const history = useHistory()
  const { pathname, search } = useLocation()
  const params = queryString.parse(search)
  const {items, loading, page, pageMax, notFound, setFromApi} = useItemsPagination()
  const {username: authUsername} = StateContainer.useContainer()
  const queryUsername = username === "me" ? authUsername : username
  console.log("[DEBUG]: AccountPage -> loading", loading)

  useEffect(() => {
    const userProfilePromise = getUserProfile(username)
    const itemPromise = getItems({...params, username: queryUsername})
    Promise.all([userProfilePromise, itemPromise])
      .then(result => {
        console.log("[DEBUG]: AccountPage -> result", result)
        const [userResponse, itemsResponse] = result
        setUserProfile(userResponse.data)
        setFromApi(itemsResponse.data)
      })
      .catch(() => {
        history.push('/404')
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, history, search])


  const searchCallback = (qs: String) => {
    console.log("[DEBUG]: searchCallback -> qs", qs)
    history.push(pathname + "?" + queryString.stringify({...params, query: qs}))
  }

  const filterCallback = (selected: String[]) => {
    console.log("[DEBUG]: filterCallback -> selected", selected)
    history.push(pathname + "?" + queryString.stringify({...params, category: selected}))
  }

  const onChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    history.push(pathname + "?" + queryString.stringify({...params, page: value - 1}))
  };

  const getCategory = () => {
    let ret: any = {
      ram: false,
      processor: false,
      storage: false,
      vga: false,
      motherboard: false,
      all: false,
    }
    const {category} = params
    if (!category) {
      ret.all = true
    }else if (typeof(category) == 'string'){
      ret[category] = true
    }else{
      category.forEach((val) => {
        ret[val] = true
      })
    }
    return ret
  }

  return loading ? <LoadingPage></LoadingPage> : <Grid container justify="center">
    <Grid item xs={12}>
      <Navbar></Navbar>
    </Grid>
    {!loading ? <Grid item xs={12} md={12} style={{marginBottom: '2rem'}}>
      <Grid container direction="row" justify="center">
        <Grid item xs={12} md={8} className={classes.pad}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} md={8}>
              <UserProfile 
                id={userProfile?.id || 0}
                name={userProfile?.name || ''} 
                username={userProfile?.username || ''} 
                telp={userProfile?.telp || ''}
                email={userProfile?.email || ''}
                joinedAt={userProfile?.joinedAt || ''}
                description={userProfile?.description || ''}></UserProfile>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined">
                <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <Typography variant="h4" className={classes.pad}>
                        <Box fontWeight="fontWeightBold">
                          Search
                        </Box>
                      </Typography>
                      <Search initialSearch={params.query as string|| ""} onSearch={searchCallback}></Search>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4" className={classes.pad}>
                        <Box fontWeight="fontWeightBold">
                          Filter
                        </Box>
                      </Typography>
                      <Filter onChange={filterCallback} initialState={getCategory()}></Filter>
                    </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <h4>Items</h4>
            </Grid>
            <Grid item xs={11}>
              {notFound ? <SearchNotFound></SearchNotFound> : <Grid container direction="row" className={classes.root} spacing={4} justify="center">
                  {items.map(item => (
                    <Grid item onClick={() => {
                      history.push(`/item/details/${item.id}`)
                    }}>
                      <ItemCard title={item.title} price={item.price} category={item.category} owner={item.username}></ItemCard>
                    </Grid>
                  ))}
              </Grid>}
            </Grid>
            <Grid item>
              <Box margin={4}>
                <Pagination count={pageMax} color="primary" onChange={onChangePagination} page={Number(page || 1)}/>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>: null}
  </Grid>
}