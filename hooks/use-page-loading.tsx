import Router from "next/router";
import { useEffect, useState } from "react";

export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const routeEventStart = () => {
      console.log("Route Even Start");
      setIsPageLoading(true);
    };
    const routeEventEnd = () => {
      console.log("Route Even End");
      setIsPageLoading(false);
    };

    Router.events.on("routeChangeStart", routeEventStart);
    Router.events.on("routeChangeComplete", routeEventEnd);
    Router.events.on("routeChangeError", routeEventEnd);
    return () => {
      Router.events.off("routeChangeStart", routeEventStart);
      Router.events.off("routeChangeComplete", routeEventEnd);
      Router.events.off("routeChangeError", routeEventEnd);
    };
  }, []);

  return { isPageLoading };
};
