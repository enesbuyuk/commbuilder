"use client"

export default function VideoBackground({ children }: { children: React.ReactNode }) {
    return(
        <>
            {children}
            <video
                src="/theme/background.webm"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                className="absolute inset-0 -z-10 w-full h-svh object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/80 -z-10"></div>
        </>
    )
}
