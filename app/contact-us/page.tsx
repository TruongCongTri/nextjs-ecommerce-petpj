import ContactForm from "@/components/forms/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addressConfig, mailConfig, phoneConfig } from "@/data/information";
import { Mail, MapPin, Phone } from "lucide-react";

import React from "react";

export default function ContactUsPage() {
  return (
    <div>
      <div className="container mx-auto px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20 flex flex-col lg:flex-row gap-4">
        <Card className="lg:basis-1/4 py-[20px] lg:py-[44px] ">
          <CardContent className="flex flex-col h-full justify-between ">
            <div className="flex flex-col lg:justify-center items-center gap-4">
              <MapPin className="size-[50px] text-primary" />
              <div className="text-center font-normal text-base text-muted-foreground">{`${addressConfig[0].address}`}</div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col lg:justify-center items-center gap-4">
              <Mail className="size-[50px] text-primary" />
              <a href={`mailto:${mailConfig[0].mail}`}>
                <div className="text-center font-normal text-base text-muted-foreground">{`${mailConfig[0].mail}`}</div>
              </a>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col lg:justify-center items-center gap-4">
              <Phone className="size-[50px] text-primary" />
              <a href={`tel:${phoneConfig[0].phone}`}>
                <div className="text-center font-normal text-base text-muted-foreground">{`${phoneConfig[0].phone}`}</div>
              </a>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:basis-3/4 py-[20px] lg:px-[30px] lg:py-[44px] ">
          <CardContent className="space-y-4">
            <div className=" text-4xl font-semibold">Just Say Hello!</div>
            <div className="text-sm font-normal text-muted-foreground lg:max-w-[500px]">
              Do you fancy saying hi to me or you want to get started with your
              project and you need my help? Feel free to contact me.
            </div>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.929567648131!2d-121.83457552430025!3d37.273097240900256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e3216396f6f31%3A0x473a9b29570ae0a9!2sRiver%20Ash%20Ct%2C%20San%20Jose%2C%20CA%2095136%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1742188814136!5m2!1svi!2s"
        width="600"
        height="450"
        allowFullScreen={true}
        loading="lazy"
        className="w-full"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
