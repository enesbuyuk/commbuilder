'use client';
import { useEffect, useRef } from 'react';
import './GradientBackground.css';

export default function GradientBackground({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = ref.current;
        const overlay = container?.querySelector('.overlay');

        const handleMove = (e: MouseEvent) => {
            if (!container || !overlay) return;

            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            (overlay as HTMLElement).style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(200,200,200,0.1), transparent 80%)`;

            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            container.appendChild(ripple);

            ripple.addEventListener('animationend', () => ripple.remove());
        };

        container?.addEventListener('mousemove', handleMove);
        return () => container?.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div className="flex overflow-hidden w-full justify-center">
            <div className="absolute inset-0 -z-10 gradient-background"></div>
            <div className="flex flex-col justify-around">{children}</div>
        </div>
    );
}
