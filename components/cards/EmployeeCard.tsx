import { Facebook, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { IUserType } from "@/models/authorization";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export default function EmployeeCard(user: IUserType) {
  return (
    <Card className="lg:w-[240px] w-[190px] group relative space-y-4 overflow-hidden ">
      <div className="group-hover:border-green-400 border border-gray-300 rounded-xl ">
        <figure className="group-hover:bg-black rounded-t-xl">
          <Image
            src={`${user.image ? user.image : "/images/placeholder.svg"}`}
            alt={user.username}
            width={190}
            height={190}
            className=" w-full aspect-square rounded-t-xl"
          />
        </figure>
        <CardContent className="px-4 py-5">
          <div className="flex justify-between">
            <div>
              <div className="text-lg font-medium group-hover:text-green-600">
                <span aria-hidden="true" className="absolute inset-0" />
                {user.firstName} {user.lastName}
              </div>

              <p className="font-normal text-sm text-muted-foreground uppercase">
                {user.role}
              </p>
            </div>
          </div>

          <div className="">
            <div className="opacity-0 group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="text-white absolute top-24 start-4 rounded-full border border-transparent hover:bg-primary/70 hover:text-white"
              >
                <Facebook className="size-12" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white absolute top-24 end-24 rounded-full border border-transparent hover:bg-primary/70 hover:text-white"
              >
                <Twitter className="size-10" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white absolute top-24 end-4 rounded-full border border-transparent hover:bg-primary/70 hover:text-white"
              >
                <InstagramLogoIcon className="size-12" />
              </Button>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter className="p-0 border-t">
        <Button variant="ghost" className="w-full">
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </CardFooter> */}
      </div>
    </Card>
  );
}
