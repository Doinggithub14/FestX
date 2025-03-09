"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function AnimatedNavigationTabs({ items }: AnimatedNavigationTabsProps) {
  const router = useRouter();
  const [active, setActive] = useState<Props>(items[0]);
  const [isHover, setIsHover] = useState<Props | null>(null);
  return (
    <main className="relative flex items-start md:items-center justify-center">
      <div className="relative">
        <ul className="flex items-center justify-center">
          {items.map((item) => (
            <button
              key={item.id}
              className={cn(
                "py-2 relative duration-300 transition-colors hover:!text-primary",
                active.id === item.id ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => {
                setActive(item);
                if (item.href) {
                  router.push(item.href);
                } else {
                  document
                    .getElementById(`section-${item.id}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
            >
              <div className="px-5 py-2 relative">
                {item.tile}
                {isHover?.id === item.id && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute bottom-0 left-0 right-0 w-full h-full bg-primary/10"
                    style={{
                      borderRadius: 6,
                    }}
                  />
                )}
              </div>
              {active.id === item.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </ul>
      </div>
    </main>
  );
}

type Props = {
  id: number;
  tile: string;
  href?: string;
};

type AnimatedNavigationTabsProps = {
  items: Props[];
};
