import React from "react";
import FooterMain from "./FooterMain";
import { footerConfig} from "@/data/navigation";
import FooterSubscribe from "./FooterSubscribe";

export default function Footer() {
  return (
    <div>
      <FooterSubscribe />
      <FooterMain items={footerConfig} />
    </div>
  );
}
