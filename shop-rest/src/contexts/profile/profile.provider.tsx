import React, { useContext, useReducer } from "react";
import { v4 as uuidV4 } from "uuid";
import schedules from "features/checkouts/data";
import { ProfileContext } from "./profile.context";
import { AuthContext } from "../auth/auth.context";
import { getLocalState } from "utils/localStorage";
import { USER_KEY } from "utils/constant";

type Action =
  | { type: "HANDLE_ON_INPUT_CHANGE"; payload: any }
  | { type: "ADD_OR_UPDATE_CONTACT"; payload: any }
  | { type: "DELETE_CONTACT"; payload: any }
  | { type: "ADD_OR_UPDATE_ADDRESS"; payload: any }
  | { type: "DELETE_ADDRESS"; payload: any }
  | { type: "ADD_CARD"; payload: any }
  | { type: "DELETE_CARD"; payload: any }
  | { type: "SET_PRIMARY_CONTACT"; payload: any }
  | { type: "SET_PRIMARY_ADDRESS"; payload: any }
  | { type: "SET_PRIMARY_SCHEDULE"; payload: any }
  | { type: "SET_PRIMARY_CARD"; payload: any };

function reducer(state: any, action: Action): any {
  switch (action.type) {
    case "HANDLE_ON_INPUT_CHANGE":
      return { ...state, [action.payload.field]: action.payload.value };

    case "ADD_OR_UPDATE_CONTACT":
      let contacts = state.contact;
      if (contacts.length === 0) contacts.push(action.payload.value.number);
      else {
        contacts.splice(action.payload.index, 1, action.payload.value.number);
      }

      // if (action.payload.id) {
      //   return {
      //     ...state,
      //     contact: state.contact.map((item: any) =>
      //       item.id === action.payload.id ? { ...item, ...action.payload } : item
      //     ),
      //   };
      // }
      // const newContact = {
      //   ...action.payload,
      //   id: uuidV4(),
      //   type: state.contact.length === "0" ? "primary" : "secondary",
      // };
      return {
        ...state,
        contact: contacts,
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contact: state.contact.filter((item: any) => item.id !== action.payload),
      };

    case "ADD_OR_UPDATE_ADDRESS":
      let addresses = state.address;
      if (contacts.length === 0) contacts.push(action.payload.address);
      else {
        contacts.splice(action.payload.index, 1, action.payload.address);
      }

      // if (action.payload.id) {
      //   return {
      //     ...state,
      //     address: state.address.map((item: any) =>
      //       item.id === action.payload.id ? { ...item, ...action.payload } : item
      //     ),
      //   };
      // }
      // const newAdress = {
      //   ...action.payload,
      //   id: uuidV4(),
      //   type: state.address.length === "0" ? "primary" : "secondary",
      // };
      return {
        ...state,
        address: addresses,
      };

    case "DELETE_ADDRESS":
      return {
        ...state,
        address: state.address.filter((item: any) => item.id !== action.payload),
      };

    case "ADD_CARD":
      const newCard = {
        id: action.payload.id,
        type: state.card.length === "0" ? "primary" : "secondary",
        cardType: action.payload.brand.toLowerCase(),
        name: state.name,
        lastFourDigit: action.payload.last4,
      };
      return {
        ...state,
        card: [newCard, ...state.card],
      };

    case "DELETE_CARD":
      return {
        ...state,
        card: state.card.filter((item: any) => item.id !== action.payload),
      };

    case "SET_PRIMARY_CONTACT":
      return state;
    // return {
    //   ...state,
    //   contact: state.contact.map((item: any) =>
    //     item.id === action.payload ? { ...item, type: "primary" } : { ...item, type: "secondary" }
    //   ),
    // };

    case "SET_PRIMARY_ADDRESS":
      // return {
      //   ...state,
      //   address: state.address.map((item: any) =>
      //     item.id === action.payload ? { ...item, type: "primary" } : { ...item, type: "secondary" }
      //   ),
      // };
      return state;

    case "SET_PRIMARY_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.map((item: any) =>
          item.id === action.payload ? { ...item, type: "primary" } : { ...item, type: "secondary" }
        ),
      };

    case "SET_PRIMARY_CARD":
      return {
        ...state,
        card: state.card.map((item: any) =>
          item.id === action.payload ? { ...item, type: "primary" } : { ...item, type: "secondary" }
        ),
      };

    default:
      return state;
  }
}

type ProfileProviderProps = {
  initData: any;
};

export const ProfileProvider: React.FunctionComponent<ProfileProviderProps> = ({
  children,
  initData,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initData, schedules });
  return <ProfileContext.Provider value={{ state, dispatch }}>{children}</ProfileContext.Provider>;
};
