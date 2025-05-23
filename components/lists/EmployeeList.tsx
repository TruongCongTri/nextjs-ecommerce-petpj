import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import apis from "@/apis";
import { IUserFetch } from "@/models/authorization";
import EmployeeCard from "../cards/EmployeeCard";

const fetchUsers = async (): Promise<IUserFetch> => {
  const res = await apis.user.getUsers();
  return res.json();
};

export async function EmployeeList() {
  const data = await fetchUsers();

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-[50px] gap-3">
        <div className="font-semibold text-3xl lg:text-5xl text-center">Our Awesome Team</div>
        <div className="font-medium text-base text-muted-foreground lg:max-w-[600px] text-center">
          Pellentesque a ante vulputate leo porttitor luctus sed eget eros.
          Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a
          mi.
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className=""
      >
        <CarouselContent className="space-x-1">
          {data.users.map((o, idx) => (
            <CarouselItem key={idx} className="basis-1/2 lg:basis-1/4">
              <div className="">
                <EmployeeCard {...o} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden lg:grid">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </>
  );
}
