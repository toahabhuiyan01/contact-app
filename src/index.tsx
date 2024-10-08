import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { setDataStorage } from './utils/manageLocalStorage';
axios.interceptors.request.use(config => {
  let userData = JSON.parse(localStorage.getItem("userData") || "{}");
  let token;
  token = userData !== null ? userData['access_token'] : '';
  config.baseURL = "https://api-im.chatdaddy.tech/";
  if(token && config.url !== "token") {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }
  if(config.url === "token") {
    config.baseURL = "https://api-teams.chatdaddy.tech/";
  }

  return config;
})

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {

      const refreshTokenBody = {
        "refreshToken": "03412bc4-9da1-44f3-96e4-92246605ef60",
        "teamId": "d0b96942-77aa-46cf-833d-f34a8c111c9e"
      }
      return axios.post(`token`, refreshTokenBody)
          .then((response: any) => {
              console.log(response)
              setDataStorage(JSON.stringify(response.data));
              error.response.config.headers['Authorization'] = `Bearer ${response?.access_token}`;
              try {
                  return axios(error.response.config);
              }
              catch(err) {
                  console.log(err);
              }
          })
          .catch(error => {
              console.log(error);
          });
  }
  return Promise.reject(error);
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
