import { useState } from "react";
import { createContainer } from "unstated-next";
import {TOKENKEY, USERNAMEKEY} from '../constants'

type authState = {
  token: string,
  username: string,
  loggedIn: boolean
}

const useAuth = (initialState: authState = {token: "", loggedIn: false, username: ""}) => {
  const [token, setToken] = useState<string>(initialState.token);
  const [loggedIn, setLoggedIn] = useState<boolean>(initialState.loggedIn);
  const [username, setUsername] = useState<string>(initialState.username)

  const login = (accessToken: string, username: string) => {
    localStorage.setItem(TOKENKEY, accessToken);
    localStorage.setItem(USERNAMEKEY, username)
    setToken(accessToken);
    setLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem(TOKENKEY);
    localStorage.removeItem(USERNAMEKEY);
    setToken("")
    setUsername("")
    setLoggedIn(false)
  }

  return {
    token,
    username,
    loggedIn,
    login,
    logout
  }
};

const StateContainer = createContainer(useAuth);
export default StateContainer;
