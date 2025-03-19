"use client";
// Importing necessary components and functions
import { useEffect } from "react"; // importing useEffect hook from react
import { getCookie } from "cookies-next"; // a function to get the value of a cookie
import { useAuthStore } from "@/store/userAuthStore";
import Header from "./Header";
import Footer from "./Footer";

// a hook to access the authentication store

// Defining the layout component
export default function Layout({ children }: any) {
  // Getting the token value from a cookie
  const token = getCookie("token");

  // Getting the setAuthentication function from the authentication store
  const setAuthentication = useAuthStore((state) => state.setAuthentication);

  // Getting the setUser function from the authentication store
  // const setUser = useAuthStore((state) => state.setUser);

  // Running a side effect whenever the token value changes
  useEffect(() => {
    console.log(token); // Logging the token value for debugging purposes
    if (token) {
      setAuthentication(true); // Setting the authentication status to true if a token exists

      // const fetchUser = async () => {
      //   const authRes = await /* providing accessToken in bearer */
      //   fetch("https://dummyjson.com/auth/me", {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
      //     },
      //     // credentials: "include", // Include cookies (e.g., accessToken) in the request
      //   });
      //   // const authRes = await apis.auth.getAuthUser(token);
      //   if (authRes.ok) {
      //     console.log(`get auth by token success default layoyut`);

      //     const authData = await authRes.json();
      //     setUser(authData);
      //     console.log(authData);
      //   }
      // };

      // fetchUser();
    }
  }, [setAuthentication, token]);

  // Rendering the layout with the Navbar, main content, and Footer components
  return (
    <>
      <Header />
      <main className="mainContent">{children}</main>
      <Footer />
    </>
  );
}
