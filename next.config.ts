import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "fakestoreapi.com",
      "bundui-images.netlify.app",
      "i.postimg.cc",
      "files.vidstack.io",
      "cdn.dummyjson.com",
      "cdn.dummyjson.com",
      "dummyjson.com",
    ],

    // loader: "custom",
    // loaderFile: "./components/images/loader.ts",
  },
};

export default nextConfig;
