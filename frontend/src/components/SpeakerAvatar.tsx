"use client";
import Image from "next/image";
import { useState } from "react";

interface SpeakerAvatarProps {
    speakerId: string;
    speakerName: string;
}

export default function SpeakerAvatar({ speakerId, speakerName }: SpeakerAvatarProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg shrink-0 ring-2 ring-orange-500/50 group-hover:ring-pink-600/50 transition-all bg-gradient-to-br from-orange-500 to-pink-600">
            {!imageError ? (
                <Image
                    src={`${process.env.NEXT_PUBLIC_BUCKET}/uploads/${speakerId}.webp`}
                    alt={speakerName}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                <svg className="w-8 h-8 text-white absolute inset-0 m-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
            )}
        </div>
    );
}
