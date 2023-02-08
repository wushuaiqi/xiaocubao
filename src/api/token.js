import {post} from "@/api/request.js";

export const createToken = (username, password) => {
  return post('/tokens', {username, password})
}