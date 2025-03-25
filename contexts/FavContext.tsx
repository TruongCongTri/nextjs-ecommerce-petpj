"use client";
import { ICartProductType } from "@/models/carts";
import React, { useEffect } from "react";
import { toast } from "sonner";

export type FavItemsList = {
  favItems: ICartProductType[];
  addToFav: (item: ICartProductType) => void;
  removeFromFav: (item: ICartProductType) => void;
  clearAllFav: () => void;
};
export const FavContext = React.createContext<FavItemsList | null>(null);

const FavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favItems, setFavItems] = React.useState<ICartProductType[]>([]);

  const addToFav = (item: ICartProductType) => {
    console.log("add product to fav");
    // check if the item is already in the fav
    const isItemInFav = favItems.find((favItem) => favItem.id === item.id);

    if (isItemInFav) {
      toast.warning(`Product ${item.title} has already been added to wishlist`);
    } else {
      setFavItems([...favItems, { ...item }]); // if the item is not in the fav, add the item to the fav
      toast.success(`Successfully add ${item.title} to wishlist`);
    }
  };

  const removeFromFav = (item: ICartProductType) => {
    console.log("remove product from fav");
    const isItemInFav = favItems.find((favItem) => favItem.id === item.id);

    if (isItemInFav) {
      setFavItems(favItems.filter((favItem) => favItem.id !== item.id));
      toast.success(`Successfully remove ${item.title} to wishlist`);
    } else {
      toast.warning(`Product ${item.title} has not been added to wishlist`);
    }
  };

  const clearAllFav = () => {
    setFavItems([]);
  };

  useEffect(() => {
    const locallyStoredFav = localStorage.getItem("favItems");

    if (locallyStoredFav) {
      setFavItems(JSON.parse(locallyStoredFav));
    }
  }, []);

  useEffect(() => {
    console.log("fav item change");
    console.log(favItems);

    localStorage.setItem("favItems", JSON.stringify(favItems));
  }, [favItems]);

  return (
    <FavContext.Provider
      value={{
        favItems,
        addToFav,
        removeFromFav,
        clearAllFav,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};

export default FavProvider;
