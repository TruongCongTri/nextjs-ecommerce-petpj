//creates a store for authentication-related state in a React application using Zustand. It provides methods to set and update the authentication and user information stored in the state.
// Importing create function from the Zustand library
import { IUserType } from "@/models/authorization";
import { create } from "zustand";

// Defining an interface for the store's state
interface AuthStoreInterface {
  authenticated: boolean; // a boolean value indicating whether the user is authenticated or not
  setAuthentication: (val: boolean) => void; // a function to set the authentication status
  user: IUserType; // an object that stores user information
  setUser: (user: IUserType) => void; // a function to set user information
}

// create our store
export const useAuthStore = create<AuthStoreInterface>((set) => ({
  authenticated: false, // initial value of authenticated property
  user: {}, // initial value of user property
  setAuthentication: (val) => set((state) => ({ authenticated: val })), // function to set the authentication status
  setUser: (user) => set({ user }), // function to set user information
}));
