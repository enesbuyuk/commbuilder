'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

type LocaleMap = Record<string, string>;
type GalleryItem = {
    _id: string;
    title: LocaleMap;
    description: LocaleMap;
    imageUrl: string;
    date: string;
};

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const locale = useLocale();

    useEffect(() => {
        let isMounted = true;
        const fetchGallery = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/api/external/gallery`,
                    { cache: "no-store" }
                );
                if (!res.ok) throw new Error("Failed to fetch gallery");
                const data: GalleryItem[] = await res.json();
                if (isMounted) setGalleryImages(Array.isArray(data) ? data : []);
            } catch (e) {
                if (isMounted) setError("Failed to load gallery");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchGallery();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedImage) {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [selectedImage]);

    const openModal = (imageSrc: string) => setSelectedImage(imageSrc);
    const closeModal = () => setSelectedImage(null);

    if (loading) return <div className="text-center p-10">Yükleniyor…</div>;
    if (error) return <div className="text-center p-10">{error}</div>;
    if (!galleryImages || galleryImages.length === 0) {
        return <div className="text-center p-10">No images found</div>;
    }

    // Define different size patterns for variety - matching the layout in the image
    const getSizeClass = (index: number) => {
        const patterns = [
            { cols: "col-span-1", rows: "row-span-1" },  // small - top left
            { cols: "col-span-1", rows: "row-span-1" },  // small - top middle
            { cols: "col-span-2", rows: "row-span-2" },  // large - top right (spans 2x2)
            { cols: "col-span-2", rows: "row-span-2" },  // large - bottom left (spans 2x2)
            { cols: "col-span-1", rows: "row-span-1" },  // small - bottom right top
            { cols: "col-span-1", rows: "row-span-1" },  // small - bottom right bottom
        ];
        return patterns[index % patterns.length];
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[200px]">
                {galleryImages.map((item, index) => {
                    const title = item.title?.[locale] ?? item.title?.en ?? "";
                    const { cols, rows } = getSizeClass(index);
                    
                    return (
                        <div
                            key={item._id}
                            className={`relative w-full cursor-pointer rounded-lg overflow-hidden bg-gray-200 hover:opacity-90 transition-opacity duration-200 ${cols} ${rows}`}
                            onClick={() => openModal(item.imageUrl)}
                            title={title}
                        >
                            <Image
                                src={item.imageUrl}
                                alt={title || "gallery"}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    console.error('Image failed to load:', item.imageUrl);
                                }}
                            />
                            {title ? (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs md:text-sm px-3 py-2 truncate">
                                    {title}
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85"
                    onClick={closeModal}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 text-white text-4xl font-extrabold"
                            onClick={closeModal}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <Image
                            width={1200}
                            height={1200}
                            alt="Selected"
                            className="max-w-full max-h-screen object-contain"
                            src={selectedImage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}