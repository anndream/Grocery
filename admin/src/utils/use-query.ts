import { useLocation } from "react-router-dom";

export const useQuery = () => {
  let search = useLocation().search;
  let query: any = search
    .replace("?", "")
    .split("&")
    .reduce(
      (splitted, current) => (
        (splitted[current.split("=")[0]] = decodeURIComponent(current.split("=")[1])), splitted
      ),
      {}
    );

  return query;
};
