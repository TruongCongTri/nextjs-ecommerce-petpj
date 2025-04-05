import TopicCard from "@/components/cards/TopicCard";
import Container from "@/components/layouts/container";
import prisma from "@/lib/db";
import Script from "next/script";
// import Marquee from "react-fast-marquee";

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: { author: true },
  });

  return (
    <Container>
      <Script src="/js/text-script.js" />
      <div className="flex flex-1 flex-col gap-4">
        <div className="min-h-screen">
          <div className="text md:font-[700] md:text-[180px] font-[700] text-[75px] leading-none text-center">
            Welcome to Easy Ielts
          </div>
          <h1 className="text-center mt-20 md:font-[10] md:text-[80px] font-[10] text-[60px]">
            ... <span></span>
          </h1>
        </div>
        {categories && (
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {categories.map((o, idx) => (
              <TopicCard key={idx} variant="default" item={o} />
            ))}
          </div>
        )}
        {/* <Marquee className="min-w-auto font-[800] text-[180px]">
          <div className="">Listening</div>{" "}
          <div className="" >Reading</div>{" "}
          <div className="" >Writing</div>{" "}
          <div className="" >Speaking</div>{" "}
        </Marquee> */}
        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      </div>
    </Container>
  );
}
