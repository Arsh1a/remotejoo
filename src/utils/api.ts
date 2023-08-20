import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export const SSRFetcher = async (url: string) => {
  try {
    return await axios.get(API_URI + url).then((res) => res.data);
  } catch (err) {
    return null;
  }
};

// Create axios instance.
export const axiosInstance = axios.create({
  baseURL: API_URI,
  withCredentials: true,
});

//Auto fetch access-token
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await axios.get(API_URI + "/auth/access-token", {
            withCredentials: true,
          });
          return axios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error); // Reject the promise with the error
        }
      }
    }

    return Promise.reject(err); // Reject the promise for other errors
  }
);

export const postData = async (url: string, data: any) => {
  return await axiosInstance.post(url, data, {
    withCredentials: true,
  });
};

export const getData = async <T>(url: string, withCredentials?: boolean) => {
  return await axiosInstance.get<T>(url, {
    withCredentials,
  });
};

export const patchData = async <T>(url: string, data?: any) => {
  return await axiosInstance.patch<T>(url, data, {
    withCredentials: true,
  });
};

export const deleteData = async (url: string) => {
  return await axiosInstance.delete(url, {
    withCredentials: true,
  });
};

export const postDataWithoutRetry = async (url: string, data: any) => {
  return await axios.post(API_URI + url, data, {
    withCredentials: true,
  });
};

export const filterObjectToQueryString = (obj: any) => {
  let queryString = "";

  for (const key in obj) {
    if (
      obj[key] !== undefined &&
      obj[key].length !== 0 &&
      obj[key] !== "" &&
      obj[key] !== null
    ) {
      if (queryString.length > 0) {
        queryString += "&";
      }
      if (Array.isArray(obj[key])) {
        queryString += `${key}=${obj[key].join(",")}`;
      } else {
        queryString += `${key}=${obj[key]}`;
      }
    }
  }
  return queryString;
};
