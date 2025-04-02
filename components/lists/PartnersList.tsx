import { partnersData } from "@/data/data";
import React from "react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default function PartnersList() {
  return (
    <div className="flex items-center gap-4 lg:gap-[80px]">
      {partnersData.map((o, idx) => (
        <div key={idx} className="flex items-center gap-4 lg:gap-[80px]">
          <Link href={o.url}>
            <Image src={o.icon} width={80} height={32} alt={o.name} />
          </Link>
          {partnersData.length - 1 !== idx && (
            <Separator orientation="vertical" />
          )}
        </div>
      ))}
    </div>
  );
}
