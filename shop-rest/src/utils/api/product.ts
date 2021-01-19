import { getLocalState } from "utils/localStorage";
import { BASE_URL, TOKEN_KEY } from "utils/constant";

const productUrl = `${BASE_URL}/products`;
const productFetcher = url =>
  fetch(url, {
    headers: {
      Authorization: getLocalState(TOKEN_KEY),
      Accept: "application/json",
    },
  }).then(res => res.json());

export async function getAllProducts() {
  const { data } = await productFetcher(productUrl);
  return data;
}

export async function getProductById(id) {
  const { data } = await productFetcher(`${productUrl}/${id}`);
  return data;
}
