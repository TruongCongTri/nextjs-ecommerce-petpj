import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [`res.cloudinary.com`, `i.postimg.cc`, `encrypted-tbn1.gstatic.com`, `cdn.pixabay.com`, `images.pexels.com`],
    
  },
};

export default nextConfig;
