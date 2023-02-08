import {get} from "@/api/request.js";

export const me = () => {
  return get('/user/me')
}