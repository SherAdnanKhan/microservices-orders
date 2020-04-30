import http from "../services/httpService"
import { userKey } from "../constants/keys"
import isEmpty from "../utils/helperFunctions";


const apiEndpoint = '/register';

export const register = credentials => {
  http.post()
}

export const login = credentials => {

}

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem(userKey));
  return isEmpty(user) ? null : user;
}

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
}