import axios from "axios";

export const getProductsDataService = () => {
  return axios
    .get("https://dummyjson.com/products")
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
