'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUploadSuccess = (result: any) => {
        if (result && result.info && result.info.secure_url) {
            onChange(result.info.secure_url);
        }
    };

    return (
        <CldUploadWidget
            uploadPreset="sxcsm7kk"
            onSuccess={handleUploadSuccess}
            onQueuesEnd={(result, { widget }) => {
                widget.close();
            }}
        >
            {({ open }) => (
                <div
                    onClick={() => open?.()}
                    className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                >
                    <TbPhotoPlus size={50} />
                    <div className="font-semibold text-lg">
                        Click to upload
                    </div>
                    {value && (
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                alt="upload"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                                src={value}
                            />
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    );
};

export default ImageUpload;
