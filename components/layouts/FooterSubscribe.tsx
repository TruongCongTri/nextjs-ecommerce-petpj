import React from "react";
import SubscribeForm from "../forms/SubscribeForm";

export default function FooterSubscribe() {
  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto py-12 px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2 lg:w-[400px]">
          <span className="font-semibold text-2xl ">
            Subscribe our Newsletter
          </span>
          <p className="text-muted-foreground font-normal text-sm">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna.
          </p>
        </div>
        <div className="grid gap-2 block my-auto">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}
