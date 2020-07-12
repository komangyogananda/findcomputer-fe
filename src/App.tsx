import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ExplorePage from './components/ExplorePage';
import AccountPage from './components/AccountPage';
import ItemDetails from './components/ItemDetails';
import AddItemPage from './components/AddItemPage';
import NotFoundRoute from './components/NotFoundRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/explore">
            <ExplorePage></ExplorePage>
          </Route>
          <Route path="/account">
            <AccountPage></AccountPage>
          </Route>
          <Route path="/item/details">
            <ItemDetails></ItemDetails>
          </Route>
          <Route path="/item/add">
            <AddItemPage></AddItemPage>
          </Route>
          <Route exact strict path="/">
            <HomePage></HomePage>
          </Route>
          <Route>
            <NotFoundRoute></NotFoundRoute>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
