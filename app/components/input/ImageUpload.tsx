'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any
}
interface ImageUploadProprs {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProprs) => {
    return (
        <CldUploadWidget
            uploadPreset="sxcsm7kk"
            onSuccess={(result, { widget }) => {
                onChange(result?.info.secure_url)
                // { public_id, secure_url, etc }
            }}
            onQueuesEnd={(result, { widget }) => {
                widget.close();
            }}
        >
            {({ open }) => {

                return (
                    <div onClick={() => open?.()} className="relative cursor-pointer hover:opacity-70 transition border-dashed  border-2 p-20  border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 ">
                        <TbPhotoPlus size={50}></TbPhotoPlus>
                        <div className="text-semibold text-lg">
                            Click to upload

                        </div>
                        {
                            value && (
                                <div className="absolute inset-1 w-full h-full">
                                    <Image alt="upload" fill style={{ objectFit: 'cover', objectPosition: 'center' }}
                                        src={value}>

                                    </Image>

                                </div>
                            )
                        }
                    </div>
                );
            }}
        </CldUploadWidget>



    );
};

export default ImageUpload;      