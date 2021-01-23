import useSWR from "swr";
import { getLocalState, setLocalState } from "utils/localStorage";
import { BASE_URL, TOKEN_KEY, USER_KEY } from "../utils/constant";
import { AuthContext } from "contexts/auth/auth.context";
import { useContext } from "react";

export default function useUser() {
  let { authState } = useContext<any>(AuthContext);
  let user = authState;

  const login = async (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("device_name", "android");
    let option = {
      method: "post",
      body: formData,
    };

    let { data, meta } = await fetch(`${BASE_URL}/login`, option).then(res => res.json());
    let user = restructureUser(data);
    setLocalState(USER_KEY, user);
    setLocalState(TOKEN_KEY, `Bearer ${meta.access_token}`);
  };
  const restructureUser = user => {
    user.address = [user.address];
    user.contact = [user.mobile];
    user.shipping_address = [user.shipping_address];
    user.card = [];

    return user;
  };
  const addOrUpdateContactNumber = async contact => {
    console.log(contact, "contact");
    // return await fetch(end_point_url,{method: 'POST', body: contact });
  };
  const addOrUpdateAddress = async address => {
    console.log(address, "address");

    // return await fetch(end_point_url,{method: 'POST', body: address });
  };
  const addOrUpdatePaymentCard = async payment_card => {
    console.log(payment_card, "payment_card");

    // return await fetch(end_point_url,{method: 'POST', body: payment_card });
  };
  const deleteContactNumber = async contactId => {
    console.log(contactId, "contactId");

    // return await fetch(end_point_url,{method: 'POST', body: contactId });
  };
  const deleteAddress = async addressId => {
    console.log(addressId, "addressId");

    // return await fetch(end_point_url,{method: 'POST', body: addressId });
  };
  const deletePaymentCard = async cardId => {
    console.log(cardId, "cardId");

    // return await fetch(end_point_url,{method: 'POST', body: cardId });
  };

  return {
    user,
    login,
    addOrUpdateContactNumber,
    addOrUpdateAddress,
    addOrUpdatePaymentCard,
    deleteContactNumber,
    deleteAddress,
    deletePaymentCard,
  };
}
