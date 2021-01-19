import useSWR from "swr";
import { BASE_URL, TOKEN_KEY } from "utils/constant";
import { getLocalState } from "utils/localStorage";

const categoryUrl = `${BASE_URL}/categories`;

const fetcher = url =>
  fetch(url, {
    headers: {
      Authorization: getLocalState(TOKEN_KEY),
      Accept: "application/json",
    },
  }).then(res => res.json());

interface CategoryProps {
  type: string;
}

export default function useCategory({ type }: CategoryProps) {
  let { data, mutate, error } = useSWR(categoryUrl, fetcher);

  const loading = !data && !error;
  const categories = data && data.data;

  return {
    loading,
    error,
    data: categories,
  };
}
