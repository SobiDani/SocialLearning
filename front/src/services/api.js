import axios from "axios";

export const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  Authorization: {
    toString() {
      return `Bearer ${localStorage.getItem("token")}`;
    },
  },
};

export const API = axios.create({
  baseURL: "http://localhost:8700/",
  headers: APIHeaders,
});
