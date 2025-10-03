"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types/Event";
import IndexHero from "./IndexHero";
import { useTranslations } from "next-intl";

type Props = {
  event: Event;
  locale?: string;
};

export default function CountDownClient({ event, locale = "en" }: Props) {
  const componentTranslations = useTranslations("components.countDown");
  const eventDate = new Date(event.date);

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    // disabled for local testing
    //if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showStarted, setShowStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (timeLeft && !newTimeLeft) {
        setShowStarted(true);
        setTimeout(() => setShowStarted(false), 30000);
      }

      setTimeLeft(newTimeLeft);

      if (!newTimeLeft) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const title = event.title[locale];
  const link = event.url;

  if (!timeLeft && !showStarted) {
    return <IndexHero />;
  }

  if (showStarted) {
    return (
      <div className="relative z-10 w-full max-w-4xl p-6 md:p-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          {componentTranslations("eventStarted")}
        </h1>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-4xl p-6 md:p-10 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
        {title}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {timeLeft && (
          <>
            <TimeBox label={componentTranslations("days")} value={timeLeft.days} />
            <TimeBox label={componentTranslations("hours")} value={timeLeft.hours} />
            <TimeBox label={componentTranslations("minutes")} value={timeLeft.minutes} />
            <TimeBox label={componentTranslations("seconds")} value={timeLeft.seconds} />
          </>
        )}
      </div>

      <p className="text-white/80 text-base sm:text-lg mb-8 px-4 sm:px-0">
        {event.description[locale]}
      </p>

      <a
        href={link}
        title={componentTranslations("joinTheEvent")}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-200 text-base sm:text-lg"
      >
        {componentTranslations("joinTheEvent")}
      </a>
    </div>
  );
}

type TimeBoxProps = {
  label: string;
  value: number;
};

function TimeBox({ label, value }: TimeBoxProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-white/20 rounded-2xl p-3 sm:p-4 border border-white/30">
      <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
        {value}
      </span>
      <span className="mt-1 sm:mt-2 text-white text-base sm:text-lg font-medium">{label}</span>
    </div>
  );
}
