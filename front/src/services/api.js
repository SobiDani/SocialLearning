import axios from "axios";



export const APIHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Authorization': {
      toString () {
          return `Bearer ${localStorage.getItem('token')}`
      }
  }
};

export const API = axios.create({
  baseURL: "http://192.168.1.140:8700/",
  headers: APIHeaders,
});
