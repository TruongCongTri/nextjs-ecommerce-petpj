import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IProductType } from "@/models/products";
import { Separator } from "@/components/ui/separator";
import { RatingGroup } from "@/components/ui/customize/custom-rating";
import { Card } from "@/components/ui/card";
import { CircleCheck, Leaf, Tag } from "lucide-react";

export default function ProductDetailExtra(product: IProductType) {
  // const reviews = customerReviewsData.filter((o) => o.productId === 1);

  return (
    <div className="">
      <Tabs defaultValue="descriptions" className="w-full ">
        <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-center rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="descriptions"
            className="w-20 lg:w-60 line-clamp-2 items-center justify-center py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Descriptions
          </TabsTrigger>
          <TabsTrigger
            value="addition"
            className="w-20 lg:w-60 line-clamp-2 items-center justify-center py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Additional Information
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="w-20 lg:w-60 line-clamp-2 items-center justify-center py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-base font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Customer Feedback
          </TabsTrigger>
        </TabsList>
        <div className="lg:flex gap-2">
          <div className="lg:w-[640px] lg:max-w-[640px] lg:min-w-[640px]">
            <TabsContent value="descriptions" className="w-full">
              <div className="text-sm font-normal text-muted-foreground mx-auto container py-12 px-2 lg:px-4">
                <div className="mb-5">{product.description}</div>

                <ul className="list-none">
                  <li>
                    <div className="flex items-center gap-2 py-2">
                      <CircleCheck className="size-5 text-primary" />
                      100 g of fresh leaves provides.
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2 py-2">
                      <CircleCheck className="size-5 text-primary" />
                      Aliquam ac est at augue volutpat elementum.
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2 py-2">
                      <CircleCheck className="size-5 text-primary" />
                      Quisque nec enim eget sapien molestie.
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2 py-2">
                      <CircleCheck className="size-5 text-primary" />
                      Proin convallis odio volutpat finibus posuere.
                    </div>
                  </li>
                </ul>
                <div className="mt-5">{product.description}</div>
              </div>
            </TabsContent>
            <TabsContent value="addition">
              <div className="mx-auto container py-12 px-2 lg:px-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Weight:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.weight}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Width:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.dimensions.width}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Height:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.dimensions.height}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Depth:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.dimensions.depth}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Category:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.category}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Stock Status:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.availabilityStatus}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Warranty Information:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.warrantyInformation}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Shipping Information:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.shippingInformation}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Return Policy:
                      </TableCell>
                      <TableCell className="text-sm font-normal text-muted-foreground">
                        {product.returnPolicy}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm font-normal max-w-[120px]">
                        Tags:
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 text-sm font-normal text-muted-foreground">
                          {product.tags.map((o, idx) => (
                            <div key={idx}>
                              <Link href="/" className="hover:underline">
                                {o}
                              </Link>
                              {product.tags.length - 1 !== idx ? "," : ""}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="feedback">
              <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8">
                  {product.reviews.map((o, idx) => (
                    <div key={idx} className="flex flex-col gap-3 w-full">
                      <div className="w-full flex justify-between items-center">
                        <div className="flex gap-3 items-start gap-4">
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-0.5">
                            <div className="capitalize font-medium text-sm">
                              {o.reviewerName}
                            </div>
                            <RatingGroup
                              readonly
                              ratingSteps={5}
                              // defaultValue="1"
                              value={o.rating.toString()}
                              className="size-3 "
                            />
                          </div>
                        </div>
                        <div className="font-normal text-sm text-muted-foreground">
                          2 min ago
                        </div>
                      </div>

                      <div className="font-normal text-sm text-muted-foreground  pb-2">
                        {o.comment}
                      </div>
                      {product.reviews.length - 1 !== idx && <Separator />}
                    </div>
                  ))}
                </div>
                {/* <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
                <div className="mt-8 flex justify-center">
                  <Button variant="outline">Write a Review</Button>
                </div>
              </div>
            </TabsContent>
          </div>
          <div className="px-4 py-12 sm:px-6 lg:px-8">
            <MediaPlayer
              src="https://files.vidstack.io/sprite-fight/720p.mp4"
              viewType="video"
              streamType="on-demand"
              logLevel="warn"
              crossOrigin
              playsInline
              title="Sprite Fight"
              poster="https://files.vidstack.io/sprite-fight/poster.webp"
              className="max-h-[300px] max-w-[536px]"
            >
              <MediaProvider>
                <Poster className="vds-poster" />
              </MediaProvider>
              <DefaultVideoLayout
                thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                icons={defaultLayoutIcons}
              />
            </MediaPlayer>
            <Card className="mt-6">
              <div className="flex justify-between items-center px-5 py-6">
                <div className="flex gap-4 items-center">
                  <Tag className="text-primary size-8" />
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">64% Discount</div>
                    <div className="text-xs font-normal text-muted-foreground">
                      Save your 64% money with us
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Leaf className="text-primary size-8" />
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">100% Organic</div>
                    <div className="text-xs font-normal text-muted-foreground">
                      100% Organic Vegetables
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
