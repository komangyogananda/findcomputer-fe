import Axios from "axios"
import { getApiUrl } from '../utils';
import queryString from 'query-string';

export const postLogin = (username: String, password: String) => {
  const url = getApiUrl('/auth/signin')
  console.log("[DEBUG]: postLogin -> url", url)
  return Axios.post(url, {
      username,
      password
  });
}

type ISignUp = {
  name: String,
  username: String,
  password: String,
  email: String,
  telp: String,
  description: String
}

export const postSignUp = ({
  name,
  username,
  password,
  email,
  telp,
  description
}: ISignUp) => {
  const url = getApiUrl('/auth/signup')
  return Axios.post(url, {
    name,
    username,
    password,
    email,
    telp,
    description
  })
}

export const getUserProfile = (username: String) => {
  const url = getApiUrl(`/user/${username}`)
  return Axios.get(url)
}

type IEditUser = {
  id: number,
  name: string,
  username: string,
  email: string,
  telp: string,
  description: string
}

export const putUser = (user: IEditUser) => {
  const url = getApiUrl(`/user/me`)
  return Axios.put(url, {
    ...user
  })
}

type QuerySearch = {
  page: string,
  query: string,
  category: string[],
  username: string,
}

export const getItems = (query: Partial<QuerySearch>) => {
  const baseurl = getApiUrl('/items/search')
  const url = queryString.stringifyUrl({
    url: baseurl,
    query
  })
  console.log("[DEBUG]: getItems -> url", url)
  return Axios.get(url)
}

export const getItem = (id: number) => {
  const url = getApiUrl(`/items/details/${id}`)
  return Axios.get(url)
}

type IItemRequest = {
  title: string,
  price: number,
  description: string,
  category: string,
}

export const editItem = (itemRequest: IItemRequest, id: number) => {
  const url = getApiUrl(`/items/details/${id}`)
  return Axios.put(
    url,
    {...itemRequest}
  )
}

export const deleteItem = (id: number) => {
  const url = getApiUrl(`/items/details/${id}`)
  return Axios.delete(url)
}

export const buyItem = (id: number) => {
  const url = getApiUrl(`/items/details/${id}`)
  return Axios.post(url)
}

export const addItem = (itemRequest: IItemRequest) => {
  const url = getApiUrl('/items')
  return Axios.post(
    url,
    {...itemRequest}
  )
}