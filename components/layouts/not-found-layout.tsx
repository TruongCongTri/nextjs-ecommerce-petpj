import Link from "next/link";
import React from "react";
import Image from "next/image";
import Container from "./container";
import { Button } from "../ui/button";
export default function NotFoundLayout() {
  return (
    <Container>
      <div className="mt-10 mx-auto flex flex-col lg:flex-row lg:justify-center items-center gap-10">
        <div className="flex flex-col items-center order-2 lg:order-1 gap-4 lg:gap-8">
          <div className="text md:font-[700] md:text-[200px] font-[700] text-[100px] leading-none text-center">
            404
          </div>
          <p>Could not find requested resource</p>
          <Button>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
        <Image
          src={"https://i.postimg.cc/mgDhkYzr/Photoroom-01.png"}
          alt={""}
          width={400}
          height={400}
          className="h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] aspect-square rounded-xl order-1 lg:order-2"
        />
      </div>
    </Container>
  );
}
