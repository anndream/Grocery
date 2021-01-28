import useSWR from "swr";
import { TEST_TOKEN } from "utils/constants";
import { isNullOrEmpty } from "utils/stringHelper";

const categoryUrl = `${process.env.REACT_APP_API_URL}/categories?include=subCategories`;
const fetcher = url =>
  fetch(url, {
    headers: {
      Authorization: TEST_TOKEN,
      Accept: "application/json",
    },
  }).then(res => res.json());

export default function useCategory(search) {
  let { data, error, mutate } = useSWR(categoryUrl, fetcher);

  const loading = !data && !error;
  let categories = data && data.data;
  categories =
    categories &&
    categories.map(c => {
      return {
        ...c,
        children: c.subCategories.data,
      };
    });

  return {
    loading,
    error,
    categories,
    mutate,
    categoryUrl,
  };
}

export const saveCategory = async category => {
  const res = await fetch(categoryUrl, {
    method: "POST",
    headers: {
      Authorization: TEST_TOKEN,
      Accept: "application/json",
    },
    body: new URLSearchParams(category),
  });

  if (res.ok) {
    let { status, message } = await res.json();
    return { status, message, reload: true };
  } else {
    return { status: res.status, message: res.statusText, reload: false };
  }
};

export const updateCategory = async (category, id) => {
  const res = await fetch(categoryUrl + "/" + id, {
    method: "PUT",
    headers: {
      Authorization: TEST_TOKEN,
      Accept: "application/json",
    },
    body: new URLSearchParams(category),
  });

  if (res.ok) {
    let { status, message } = await res.json();
    return { status, message, reload: true };
  } else {
    return { status: res.status, message: res.statusText, reload: false };
  }
};

export const removeCategory = async id => {
  const res = await fetch(categoryUrl + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: TEST_TOKEN,
      Accept: "application/json",
    },
  });

  if (res.ok) {
    let { status, message } = await res.json();
    return { status, message, reload: true };
  } else {
    return { status: res.status, message: res.statusText, reload: false };
  }
};
