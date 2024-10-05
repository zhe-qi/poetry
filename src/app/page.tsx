import { promises as fs } from "node:fs";
import { getPlaiceholder } from "plaiceholder";
import Image from "next/image";
import Sakura from "./_components/sakura";
import "@/styles/styles.css";
import HomeContainer from "./_components/container";
import { Montserrat_Alternates } from "next/font/google";
import HomeHeader from "./_components/header";
import { cache } from "react";
import clsx from "clsx";

const getStaticData = cache(async () => {
  const file = await fs.readFile("public/img-home/img-bg.svg");
  return getPlaiceholder(file);
});

const fontMontserratAlternates = Montserrat_Alternates({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default async function Home() {
  const { base64 } = await getStaticData();

  return (
    <main className={clsx("main h-dvh", fontMontserratAlternates.className)}>
      <HomeHeader />
      <section className="home h-dvh">
        <Image
          className="home__bg select-none"
          sizes="100vw"
          src="/img-home/img-bg.svg"
          fill
          priority
          placeholder="blur"
          style={{ objectFit: "cover" }}
          blurDataURL={base64}
          alt="background"
        />
        <HomeContainer />
      </section>
      <Sakura />
    </main>
  );
}
