import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();
const allowedShippingMethods = ["colissimo", "chronopost"];
const allowedPaymentMethods = ["Carte bancaire", "PayPal", "Virement"];

const sanitizeText = (value, maxLength = 120) =>
  typeof value === "string"
    ? value.replace(/[<>]/g, "").trim().slice(0, maxLength)
    : "";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity +=
          action.payload.quantity || 1;
        return { ...state, cart: updatedCart };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_SHIPPING_METHOD":
      return {
        ...state,
        shippingMethod: allowedShippingMethods.includes(action.payload)
          ? action.payload
          : state.shippingMethod,
      };

    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: allowedPaymentMethods.includes(action.payload)
          ? action.payload
          : state.paymentMethod,
      };

    case "SET_SHIPPING_ADDRESS": {
      const payload = action.payload || {};
      return {
        ...state,
        shippingAddress: {
          street: sanitizeText(payload.street ?? state.shippingAddress.street),
          city: sanitizeText(payload.city ?? state.shippingAddress.city),
          postalCode: sanitizeText(
            payload.postalCode ?? state.shippingAddress.postalCode,
            20
          ),
          country: sanitizeText(payload.country ?? state.shippingAddress.country, 56),
        },
      };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: [],
    shippingMethod: "",
    paymentMethod: "",
    shippingAddress: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  return (
    <CartContext.Provider value={{ ...cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
