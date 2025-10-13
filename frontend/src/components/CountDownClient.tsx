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
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showStarted, setShowStarted] = useState(false);
  const [eventEnded, setEventEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (timeLeft && !newTimeLeft) {
        setShowStarted(true);
        setTimeout(() => {
          setShowStarted(false);
          setEventEnded(true);
        }, 30000);
      }

      setTimeLeft(newTimeLeft);

      if (!newTimeLeft) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = event.title[locale];
  const link = event.url;

  if (eventEnded) {
    return (
      <div className="relative z-10 w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 text-center mx-auto">
        <div className="backdrop-blur-sm bg-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">✨</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 drop-shadow-2xl break-words px-2">
            {componentTranslations("endedEventMessage")}
          </h1>
        </div>
      </div>
    );
  }

  if (!timeLeft && !showStarted) {
    return <IndexHero />;
  }

  if (showStarted) {
    return (
      <div className="relative z-10 w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 text-center mx-auto">
        <div className="animate-bounce">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-2xl break-words px-2">
            {componentTranslations("eventStarted")}
          </h1>
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🎉</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-6xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 text-center mx-auto min-h-0">
      <div className="max-h-[85vh] overflow-y-auto overflow-x-hidden">
        {/* Event Title with gradient */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl leading-tight break-words px-2">
            {title}
          </h1>
          <div className="h-0.5 sm:h-1 w-16 sm:w-24 md:w-32 mx-auto bg-linear-to-r from-orange-400 to-pink-500 rounded-full"></div>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2">
          {timeLeft && (
            <>
              <TimeBox label={componentTranslations("days")} value={timeLeft.days} />
              <TimeBox label={componentTranslations("hours")} value={timeLeft.hours} />
              <TimeBox label={componentTranslations("minutes")} value={timeLeft.minutes} />
              <TimeBox label={componentTranslations("seconds")} value={timeLeft.seconds} />
            </>
          )}
        </div>

        {/* Event Description */}
        <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-6 lg:px-8 leading-relaxed backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl py-2 sm:py-3 md:py-4 border border-white/10 break-words max-w-4xl mx-auto">
          {event.description[locale]}
        </p>

        {/* CTA Button - Conditionally render based on countdown state */}
        {timeLeft && (timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0) ? (
          <a
            href={link}
            title={componentTranslations("joinTheEvent")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 text-sm sm:text-base md:text-lg transform hover:scale-105 hover:-translate-y-1 w-auto max-w-full"
          >
            <span className="truncate">{componentTranslations("joinTheEvent")}</span>
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        ) : (
          <div className="backdrop-blur-sm bg-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 border border-white/20 shadow-xl max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <p className="text-white/90 text-sm sm:text-base md:text-lg font-semibold break-words">
                {componentTranslations("endedEvent")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type TimeBoxProps = {
  label: string;
  value: number;
};

function TimeBox({ label, value }: TimeBoxProps) {
  return (
    <div className="group relative w-full">
      <div className="absolute -inset-0.5 rounded-xl sm:rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
      
      <div className="relative flex flex-col items-center justify-center backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-transparent min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-linear-to-br from-white to-white/80 bg-clip-text text-transparent drop-shadow-2xl tracking-tight cursor-default">
          {String(value).padStart(2, '0')}
        </span>
        
        <div className="h-0.5 w-8 sm:w-10 md:w-12 my-1 sm:my-2 bg-linear-to-r from-transparent via-white/50 to-transparent"></div>
        
        <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white/90 font-semibold uppercase tracking-wider break-words text-center px-1">
          {label}
        </span>
      </div>
    </div>
  );
}
