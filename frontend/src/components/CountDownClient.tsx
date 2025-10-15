"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types/Event";
import { useTranslations } from "next-intl";

type Props = {
  event: Event;
  locale?: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null;

export default function CountDownClient({ event, locale = "en" }: Props) {
  const t = useTranslations("components.countDown");
  const eventDate = new Date(event.date);

  const calculateTimeLeft = (): TimeLeft => {
    const diff = eventDate.getTime() - Date.now();
    
    if (diff <= 0) return null;
    
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Event has ended
  if (!timeLeft) {
    return (
      <div className="relative z-10 w-full max-w-2xl px-4 py-8 text-center mx-auto">
        <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold bg-white bg-clip-text text-transparent">
            {t("endedEvent")}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-6xl px-4 py-8 text-center mx-auto">
      {/* Event Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl">
          {event.title[locale]}
        </h1>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
      </div>

      {/* Countdown Timer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <TimeBox label={t("days")} value={timeLeft.days} />
        <TimeBox label={t("hours")} value={timeLeft.hours} />
        <TimeBox label={t("minutes")} value={timeLeft.minutes} />
        <TimeBox label={t("seconds")} value={timeLeft.seconds} />
      </div>

      {/* Event Description */}
      <p className="text-white/90 text-base md:text-lg mb-8 px-8 leading-relaxed backdrop-blur-sm bg-white/5 rounded-2xl py-4 border border-white/10 max-w-4xl mx-auto">
        {event.description[locale]}
      </p>

      {/* CTA Button */}
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
      >
        <span>{t("joinTheEvent")}</span>
        <svg 
          className="w-5 h-5 transition-transform group-hover:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
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
    <div className="group relative">
      <div className="relative flex flex-col items-center justify-center backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/5 min-h-[120px]">
        <span className="text-5xl font-black text-white drop-shadow-2xl">
          {String(value).padStart(2, '0')}
        </span>
        
        <div className="h-0.5 w-12 my-2 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        
        <span className="text-sm text-white/90 font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}
