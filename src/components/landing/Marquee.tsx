import ScrollBaseAnimation from "../ui/text-marquee";

function Marquee() {
  return (
    <>
      <div className="sm:h-[150px] md:h-[350px] lg:h-[500px] grid place-content-center">
        <ScrollBaseAnimation
          delay={500}
          baseVelocity={-3}
          className="font-bold tracking-[-0.07em] leading-[135%] bg-gradient-to-b from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent"
        >
          FestX present - Technex&apos;25
        </ScrollBaseAnimation>

        <ScrollBaseAnimation
          delay={500}
          baseVelocity={3}
          className="font-bold tracking-[-0.07em] leading-[135%] bg-gradient-to-b from-yellow-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          Join the Challenge Now | Participate in the Event
        </ScrollBaseAnimation>
      </div>
    </>
  );
}

export default Marquee;
