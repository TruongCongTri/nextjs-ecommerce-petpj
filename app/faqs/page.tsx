import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { faqsData } from "@/data/data";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function FAQsPage() {
  return (
    <div className="container mx-auto px-4 pt-4 pb-10 md:px-6 lg:px-8 lg:pt-8 lg:pb-20 flex flex-col lg:flex-row gap-4">
      <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center gap-3">
        <div className="flex flex-col gap-8">
          <div className="font-semibold text-3xl lg:text-5xl lg:max-w-[500px] text-center lg:text-left">
            Welcome, Let’s Talk About Our Ecobazar
          </div>

            {/* faq */}
          <div className="flex flex-col gap-3">
            {faqsData.map((o, idx) =>
              idx === 0 ? (
                <Collapsible
                  key={idx}
                  title={`${idx}`}
                  defaultOpen
                  className="group/collapsible lg:max-w-[500px]"
                >
                  <CollapsibleTrigger className="w-full">
                    <div
                      className="font-medium text-base p-4 flex justify-between items-center border 
              rounded-xl border-gray-100 bg-gray-100
              group-data-[state=open]/collapsible:border-primary group-data-[state=open]/collapsible:bg-white group-data-[state=open]/collapsible:rounded-t-xl group-data-[state=open]/collapsible:rounded-b-none"
                    >
                      {o.question}
                      <div className="p-2 bg-white rounded-full group-data-[state=open]/collapsible:bg-gray-100">
                        <Plus className="size-3 ml-auto transition-transform group-data-[state=open]/collapsible:hidden" />
                        <Minus className="size-3 ml-auto transition-transform hidden group-data-[state=open]/collapsible:block" />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  {/* group-data-[state=open]/collapsible: */}
                  <CollapsibleContent>
                    <div
                      className="font-normal text-sm p-4 flex justify-between items-center text-muted-foreground
                border-b border-l border-r rounded-b-xl 
              group-data-[state=open]/collapsible:border-primary group-data-[state=open]/collapsible:bg-white group-data-[state=open]/collapsible:round-t-xl"
                    >
                      {o.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Collapsible
                  key={idx}
                  title={`${idx}`}
                  className="group/collapsible lg:max-w-[500px]"
                >
                  <CollapsibleTrigger className="w-full">
                    <div
                      className="font-medium text-base p-4 flex justify-between items-center border 
              rounded-xl border-gray-100 bg-gray-100
              group-data-[state=open]/collapsible:border-primary group-data-[state=open]/collapsible:bg-white group-data-[state=open]/collapsible:rounded-t-xl group-data-[state=open]/collapsible:rounded-b-none"
                    >
                      {o.question}
                      <div className="p-2 bg-white rounded-full group-data-[state=open]/collapsible:bg-gray-100">
                        <Plus className="size-3 ml-auto transition-transform group-data-[state=open]/collapsible:hidden" />
                        <Minus className="size-3 ml-auto transition-transform hidden group-data-[state=open]/collapsible:block" />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  {/* group-data-[state=open]/collapsible: */}
                  <CollapsibleContent>
                    <div
                      className="font-normal text-sm p-4 flex justify-between items-center text-muted-foreground
                border-b border-l border-r rounded-b-xl 
              group-data-[state=open]/collapsible:border-primary group-data-[state=open]/collapsible:bg-white group-data-[state=open]/collapsible:round-t-xl"
                    >
                      {o.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            )}
          </div>
        </div>
        <Image
          width={600}
          height={700}
          alt="about-01"
          src={`/images/placeholder.svg`}
          className=""
        />
      </div>
    </div>
  );
}
