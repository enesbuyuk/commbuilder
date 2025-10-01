'use client';
import { useState } from "react";
import Image from "next/image";

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="divide-y-2 divide-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1 cursor-pointer" onClick={() => openModal(`${process.env.NEXT_PUBLIC_BUCKET}/uploads/gallery/1716286964729.jpg`)}>
                        <Image
                            width={600}
                            height={600}
                            alt="gallery"
                            className="w-full object-cover h-full object-center"
                            src={`${process.env.NEXT_PUBLIC_BUCKET}/uploads/gallery/1716286964729.jpg`}
                        />
                    </div>
                    <div className="col-span-1 cursor-pointer" onClick={() => openModal("/theme/default-image.webp")}>
                        <Image
                            width={600}
                            height={600}
                            alt="gallery"
                            className="w-full object-cover h-full object-center"
                            src={"/theme/default-image.webp"}
                        />
                    </div>
                    <div className="col-span-2 cursor-pointer" onClick={() => openModal(`${process.env.NEXT_PUBLIC_BUCKET}/uploads/gallery/1716286964629.jpg`)}>
                        <Image
                            width={600}
                            height={600}
                            alt="gallery"
                            className="w-full h-full object-cover object-center"
                            src={`${process.env.NEXT_PUBLIC_BUCKET}/uploads/gallery/1716286964629.jpg`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 cursor-pointer" onClick={() => openModal(`${process.env.NEXT_PUBLIC_BUCKET}/uploads/gallery/1732968174829.jpg`)}>
                        <Image
                            width={600}
                            height={600}
                            alt="gallery"
                            className="w-full h-full object-cover object-center"
                            src={`${process.env.NEXT_PUBLIC_BUCKET}/uploads/gallery/1732968174829.jpg`}
                        />
                    </div>
                    <div className="col-span-1 cursor-pointer" onClick={() => openModal("/theme/default-image.webp")}>
                        <Image
                            width={600}
                            height={600}
                            alt="gallery"
                            className="w-full object-cover h-full object-center"
                            src={"/theme/default-image.webp"}
                        />
                    </div>
                    <div className="col-span-1 cursor-pointer" onClick={() => openModal("/theme/default-image.webp")}>
                        <Image
                            width={600}
                            height={600}
                            alt="gallery"
                            className="w-full object-cover h-full object-center"
                            src={"/theme/default-image.webp"}
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85"
                    onClick={closeModal}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-white text-4xl font-extrabold"
                            onClick={closeModal}
                        >&times;</button>
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
