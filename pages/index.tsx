import { GetStaticProps } from "next";
import { CampList } from "../components/Camps/CampList";
import prisma from "../lib/prisma";
import { useRef, useEffect, useCallback } from "react";

type CampsProps = {
  camps: any;
};

export const getStaticProps: GetStaticProps = async () => {
  const campsLookup = await prisma.camp.findMany({
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  const camps = campsLookup.map((camp) => ({
    ...camp,
    createdAt: camp.createdAt.toUTCString(),
    updatedAt: camp.updatedAt.toUTCString(),
  }));

  return {
    props: {
      camps,
    },
    revalidate: 20,
  };
};

export const CampsPage = ({ camps }: CampsProps) => {
  // create infnite scroll.
  // const onScrollHandler = useCallback((e) => {
  //   // means bottom of the screen. call pagination api to get rest of the data.
  //   if (
  //     e.target.documentElement.scrollTop + window.innerHeight + 1 >=
  //     e.target.documentElement.scrollHeight
  //   ) {
  //     console.log("bottom of the screen");
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("scroll", onScrollHandler);

  //   return () => {
  //     document.removeEventListener("scroll", onScrollHandler);
  //   };
  // }, [onScrollHandler]);

  return (
    <div>
      <CampList camps={camps} />
    </div>
  );
};

export default CampsPage;
