// import axios, { InternalAxiosRequestConfig } from "axios";
// // for local development only.
// const prefix = 'localhost'
// const instance = axios.create({
//   baseURL: `http://${prefix}:5000`
// })

// instance.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem("token")
//     config.headers.Authorization = token
//     return Promise.resolve(config);
//   },
//   (err: any) => {
//     return Promise.reject(err);
//   }
// );

// export default instance;


// axiosWithCookies.js

import axios from 'axios';
const axiosWithToken = axios.create();
// Add an interceptor to include cookies with each request
axiosWithToken.interceptors.request.use(
  (config) => {
    // Retrieve cookies from your preferred storage (e.g., localStorage)
    const token = localStorage.getItem('token');

    console.log("token", token);
    // Set the 'Cookie' header with the retrieved cookies
    if (token) {
      config.headers.Authorization = token
      // config.headers['Cookie'] = cookies;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosWithToken;

/** 
 * 
 * // After making a request and receiving cookies in the response headers
const receivedCookies = response.headers['set-cookie'];

// Store the received cookies in localStorage
localStorage.setItem('your-cookie-key', receivedCookies.join('; '));

import axiosWithCookies from './axiosWithCookies'; // Adjust the import path

// Example GET request
axiosWithCookies.get('https://example.com/api/some-endpoint')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
// Function to retrieve a cookie value by its name
function getCookie(cookieName) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie starts with the name we're looking for
    if (cookie.startsWith(cookieName + '=')) {
      // Return the value of the cookie (substring after the '=')
      return cookie.substring(cookieName.length + 1);
    }
  }
  // If the cookie with the specified name was not found, return null
  return null;
}

// Example: Get the value of a cookie named "myCookie"
const myCookieValue = getCookie('myCookie');

// Check if the cookie value was found
if (myCookieValue !== null) {
  console.log('Value of "myCookie":', myCookieValue);
} else {
  console.log('"myCookie" not found or is empty.');
}

*/
