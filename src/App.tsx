import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import AccountPage from './components/AccountPage';
import ItemDetails from './components/ItemDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <DashboardPage></DashboardPage>
          </Route>
          <Route path="/account">
            <AccountPage></AccountPage>
          </Route>
          <Route path="/details">
            <ItemDetails></ItemDetails>
          </Route>
          <Route exact path="">
            <HomePage></HomePage>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
