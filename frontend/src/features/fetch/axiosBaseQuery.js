import baseAxios from "./axios";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const resp = await baseAxios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: resp.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          msg: err.response?.data.msg,
        },
      };
    }
  };

export default axiosBaseQuery;
