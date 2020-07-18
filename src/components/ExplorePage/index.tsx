import React, { useEffect } from 'react';
import { Grid, makeStyles, createStyles, Paper, Typography, Box } from '@material-ui/core';
import Navbar from '../Navbar';
import Search from '../Search';
import Filter from '../Filter';
import ItemCard from '../ItemCard';
import { Pagination } from '@material-ui/lab';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {getItems} from '../../api'
import LoadingPage from '../LoadingPage';
import {useItemsPagination} from '../../hooks'
import SearchNotFound from '../SearchNotFound';

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

export default function ExplorePage(){
  const classes = useStyles()
  const { pathname, search } = useLocation()
  const params = queryString.parse(search)
  console.log("[DEBUG]: ExplorePage -> params", params)
  const history = useHistory()
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
  const {items, loading, page, pageMax, notFound, setFromApi} = useItemsPagination()
  useEffect(() => {
    getItems(params)
      .then(response => {
        setFromApi(response.data)
      })
      .catch(error => {
        console.log("[DEBUG]: ExplorePage -> error", error)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

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

  return loading ? <LoadingPage></LoadingPage> : <Grid container justify="center">
    <Grid item xs={12}>
      <Navbar></Navbar>
    </Grid>
    <Grid item xs={12} md={12}>
      <Grid container direction="row" justify="center">
        <Grid item xs={12} md={3} className={classes.pad}>
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
        <Grid item xs={12} md={9}>
          {notFound ? <SearchNotFound /> : <React.Fragment>
            <Grid container direction="column" alignItems="center" spacing={4}>
              <Grid item>
                <Typography variant="h3">
                  <Box marginTop={4}>
                    Result
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Grid container direction="row" className={classes.root} spacing={4} justify="center">
                  {items.map(item => (
                    <Grid item onClick={() => {
                      history.push(`/item/details/${item.id}`)
                    }}>
                      <ItemCard title={item.title} price={item.price} category={item.category} owner={item.username}></ItemCard>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <Pagination count={pageMax} color="primary" onChange={onChangePagination} page={Number(page || 1)}/>
              </Grid>
            </Grid>
          </React.Fragment>}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}