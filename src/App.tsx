import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ExplorePage from './components/ExplorePage';
import AccountPage from './components/AccountPage';
import ItemDetails from './components/ItemDetails';
import AddItemPage from './components/AddItemPage';
import NotFoundRoute from './components/NotFoundRoute';
import axios, { AxiosRequestConfig } from 'axios';
import {TOKENKEY, USERNAMEKEY} from './constants'
import StateContainer from './store';
import ServerError from './components/ServerError';

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(TOKENKEY);
    if (token != null){
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response === undefined || error.response.status === 503){
      window.location.href = '/500'
    }
    return Promise.reject(error)
  }
)

function App() {
  const token = localStorage.getItem(TOKENKEY)
  const username = localStorage.getItem(USERNAMEKEY)
  let initialState = {
    token: "",
    username: "",
    loggedIn: false
  }
  if (token != null && username != null){
    initialState = {
      token: token,
      username: username,
      loggedIn: true,
    }
  }
  return (
    <div className="App">
      <StateContainer.Provider initialState={initialState}>
        <BrowserRouter>
          <Switch>
            <Route path="/explore">
              <ExplorePage></ExplorePage>
            </Route>
            <Route path="/account/:username">
              <AccountPage></AccountPage>
            </Route>
            <Route path="/item/details/:id">
              <ItemDetails></ItemDetails>
            </Route>
            <Route path="/item/add">
              <AddItemPage></AddItemPage>
            </Route>
            <Route exact strict path="/">
              <HomePage></HomePage>
            </Route>
            <Route exact strict path="/500">
              <ServerError></ServerError>
            </Route>
            <Route>
              <NotFoundRoute></NotFoundRoute>
            </Route>
          </Switch>
        </BrowserRouter>
      </StateContainer.Provider>
    </div>
  );
}

export default App;
