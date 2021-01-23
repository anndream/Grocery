import { getLocalState } from "utils/localStorage";
import { TOKEN_KEY } from "utils/constants";

const productUrl = `${process.env.REACT_APP_API_URL}/products`;
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
