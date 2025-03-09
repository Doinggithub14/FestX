"use client";
import Image from "next/image";

import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <div className="container mx-auto my-8 px-6">
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          imageSrc="/gallery/pic1.jpg"
          title="MoonStone"
          description="Dreams higher than the sky."
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          imageSrc="/gallery/pic2.jpg"
          title="Hacktoberfest"
          description="Code like a rockstar, party like a rockstar."
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          imageSrc="/gallery/pic3.jpg"
          title="Litopia"
          description="It's the best money you'll ever spend"
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          imageSrc="/gallery/pic4.jpg"
          title="Symphony"
          description="I'm not even kidding. Ask my mom if you don't believe me."
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          imageSrc="/gallery/pic5.jpg"
          title="Hackndore"
          description="I'm writing the code as I record this, no shit."
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  imageSrc: string;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, imageSrc, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              <Image
                src={imageSrc}
                alt={title}
                className="h-16 w-16 object-cover"
                width={500}
                height={300}
              />
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem] text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
