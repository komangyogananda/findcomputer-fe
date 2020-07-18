import queryString from "query-string";
import { BASE_URL } from "../constants";

export const getApiUrl = (path: String, query: any = {}) => {
  const url = BASE_URL + path;
  const qstring = queryString.stringifyUrl({
    url: url,
    query: query,
  });
  return qstring;
};
