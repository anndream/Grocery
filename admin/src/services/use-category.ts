import useSWR from "swr";
import { TEST_TOKEN } from "utils/constants";
import { isNullOrEmpty } from "utils/stringHelper";

const categoryUrl = `${process.env.REACT_APP_API_URL}/categories`;
const fetcher = url =>
  fetch(url, {
    headers: {
      Authorization: TEST_TOKEN,
      Accept: "application/json",
    },
  }).then(res => res.json());

export default function useCategory(search) {
  let { data, error } = useSWR(categoryUrl, fetcher);

  const loading = !data && !error;
  let categories = data && data.data;

  if (!isNullOrEmpty(search)) categories = categories.filter(x => x.name.includes(search));

  return {
    loading,
    error,
    categories,
  };
}
