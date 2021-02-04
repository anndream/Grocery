import { ADMIN_KEY, ADMIN_TOKEN_KEY } from "utils/constants";
import fetcher from "./fetcher";
const loginUrl = `/login`;

export const login = async ({ email, password }) => {
  try {
    let response = await fetcher.post(loginUrl, { email, password, device_name: "android" });

    if (response.ok) {
      let { data, meta } = await response.json();
      localStorage.setItem(ADMIN_KEY, data);
      localStorage.setItem(ADMIN_TOKEN_KEY, meta?.access_token ?? null);

      return { success: true, message: null };
    } else {
      let { errors, message } = await response.json();

      let errorMessages = "";
      Object.keys(errors).forEach(x => {
        errorMessages += "- " + errors[x] + "\n";
      });

      message = message + "\n" + errorMessages;

      return { success: false, message: message };
    }
  } catch (ex) {
    console.log(ex);
    return { success: false, message: "Login attempt failed" };
  }
};
