import { QuoteIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RatingGroup } from "../ui/customize/custom-rating";
import { IReviewType } from "@/models/reviews";

export default function CustomerReviewCard(customerReview: IReviewType) {
  return (
    <Card className="lg:w-[395px] w-full group relative space-y-4 overflow-hidden ">
      <div className="p-6 group-hover:border-green-400 border border-gray-300 rounded-xl">
        <QuoteIcon className="size-8 text-green-400 opacity-40" />
        <CardContent className="px-4 py-2">
          <div className="normal-case line-clamp-3 text-sm font-normal text-muted-foreground">
            {customerReview.comment}
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="capitalize line-clamp-2 text-base font-medium">
                  {customerReview.reviewerName}
                </div>
                <div className="capitalize text-sm font-normal text-muted-foreground">Customer</div>
              </div>
            </div>
            <RatingGroup
              readonly
              ratingSteps={5}
              defaultValue={`${customerReview.rating}`}
              value={`${customerReview.rating}`}
              className="size-3 "
              hasLabel={false}
            />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
