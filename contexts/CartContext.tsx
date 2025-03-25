"use client";

import { ICartProductType } from "@/models/carts";
import React, { useEffect } from "react";
import { toast } from "sonner";

export type CartItemsList = {
  cartItems: ICartProductType[];
  increaseCart: (item: ICartProductType) => void;
  decreaseCart: (item: ICartProductType) => void;
  addToCart: (item: ICartProductType) => void;
  clearCart: (item: ICartProductType) => void;
  clearAllCart: () => void;
  getCartTotal: () => number;
  getCartQuantity: () => number;

  // isOpenCart: boolean;
  // openCart: () => void;
  // closeCart: () => void;
};
export const CartContext = React.createContext<CartItemsList | null>(null);
// export const CartContext = createContext();

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = React.useState<ICartProductType[]>([]);

  // const [isOpenCart, setIsOpenCart] = useState(false);

  //
  // const openCart = () => {
  //   setIsOpenCart(true);
  // };
  // const closeCart = () => {
  //   setIsOpenCart(false);
  // };

  const addToCart = (item: ICartProductType) => {
    try {
      console.log("add product to cart");
      // check if the item is already in the cart
      const isItemInCart = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (isItemInCart) {
        setCartItems(
          cartItems.map(
            (
              cartItem // if the item is already in the cart, increase the quantity of the item
            ) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem // otherwise, return the cart item
          )
        );
        toast.success(`Successfully add ${item.title} to cart`);
      } else {
        setCartItems([...cartItems, { ...item, quantity: item.quantity }]); // if the item is not in the cart, add the item to the cart
        toast.success(`Successfully add ${item.title} to cart`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Fail to add ${item.title}`);
    }
    // console.log(cartItems);
  };

  const increaseCart = (item: ICartProductType) => {
    try {
      console.log("increase cart");
      // check if the item is already in the cart
      const isItemInCart = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (isItemInCart) {
        setCartItems(
          cartItems.map(
            (
              cartItem // if the item is already in the cart, increase the quantity of the item
            ) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem // otherwise, return the cart item
          )
        );
        toast.success(`Successfully update cart`);
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
        toast.success(`Successfully increase ${item.title} quantity`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Fail to increase ${item.title}`);
    }
    // console.log(cartItems);
  };

  const decreaseCart = (item: ICartProductType) => {
    try {
      console.log("decrease cart");
      const isItemInCart = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (isItemInCart && isItemInCart.quantity === 1) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      } else {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      }
      toast.success(`Successfully update cart`);
    } catch (error) {
      console.log(error);
      toast.error(`Fail to decrease ${item.title} quantity`);
    }
  };

  const clearCart = (item: ICartProductType) => {
    try {
      const isItemInCart = cartItems.find(
        (cartItems) => cartItems.id === item.id
      );
      if (isItemInCart) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      }
      toast.success(`Successfully remove ${item.title}`);
    } catch (error) {
      console.log(error);
      toast.error(`Fail to remove ${item.title}`);
    }
  };

  const clearAllCart = () => {
    try {
      setCartItems([]);
      toast.success(`Successfully clear cart`);
    } catch (error) {
      console.log(error);
      toast.error(`Fail to clear cart`);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartQuantity = () => {
    return cartItems.reduce((totalQtt, item) => totalQtt + item.quantity, 0);
  };

  useEffect(() => {
    const locallyStoredCart = localStorage.getItem("cartItems");

    if (locallyStoredCart) {
      setCartItems(JSON.parse(locallyStoredCart));
    }
  }, []);

  useEffect(() => {
    console.log("cart item change");
    console.log(cartItems);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        increaseCart,
        decreaseCart,
        addToCart,
        clearCart,
        clearAllCart,
        getCartTotal,
        getCartQuantity,

        // isOpenCart,
        // openCart,
        // closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
