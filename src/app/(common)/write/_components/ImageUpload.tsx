/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

interface ImageUploadProps {
  onImageUpload: (image: CloudinaryResult) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [publicId, setPublicId] = useState<string | null>(null);

  return (
    <>
      {publicId && (
        <CldImage src={publicId} width={270} height={180} alt='Uploaded Image' />
      )}
      <CldUploadWidget
        options={{ sources: ["local"] }}
        uploadPreset="gi3ax71p"
        onUpload={(result) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
          onImageUpload(info); // Pass the uploaded image info back to parent
        }}
      >
        {({ open }) => (
          <button onClick={() => open()}>
            Upload an Image
          </button>
        )}
      </CldUploadWidget>
    </>
  );
}
