import useSWR from "swr";
import Fuse from "fuse.js";
import { useState } from "react";
import { BASE_URL, TOKEN_KEY } from "utils/constant";
import { getLocalState } from "utils/localStorage";

const productUrl = `${BASE_URL}/products`;

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  minMatchCharLength: 2,
  keys: ["title"],
};

function search(list, pattern) {
  const fuse = new Fuse(list, options);
  return fuse.search(pattern).map(current => current.item);
}

// import productFetcher from 'utils/api/product';
const productFetcher = url =>
  fetch(url, {
    headers: {
      Authorization: getLocalState(TOKEN_KEY),
      Accept: "application/json",
    },
  }).then(res => res.json());

interface Props {
  type: string;
  text?: any;
  category?: any;
  offset?: number;
  limit?: number;
}

export default function useProducts(variables: Props) {
  const { type, text, category, offset = 0, limit = 20 } = variables ?? {};
  const { data, mutate, error } = useSWR(productUrl, productFetcher);
  const loading = !data && !error;

  let products = data && data.data;
  // if (category) {
  //   products = products?.filter(product =>
  //     product.categories.find(category_item => category_item.slug === category)
  //   );
  // }
  if (text) {
    products = search(products, text);
  }

  return {
    loading,
    error,
    data: products?.slice(offset, offset + limit),
    // hasMore,
    mutate,
    // fetchMore,
  };
}
