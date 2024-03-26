"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button"; // Assumed existing button component
import Image from "next/image";
import auth from "@/context/get-user";
import { Trash } from "lucide-react";

interface ImageUploadProps {
  bucketName: string;
  value?: string[]; // Array of image URLs
  onChange?: (urls: string[]) => void; // Callback for when images change
}

// Supabase client initialization (ensure this is correctly initialized)
const supabase = createClient();

const ImageUpload: React.FC<ImageUploadProps> = ({
  bucketName = "post-images",
  value = [],
  onChange,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Ensure that the component re-initializes images if the value prop changes
    setImages(value);
  }, [value]);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(bucketName, "HERE GO YER BUCKET");
    setUploading(true);
    const resolvedBucketName = bucketName ?? "uploads";
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const filePath = `${uuidv4()}/${file.name}`;
    const { data, error } = await supabase.storage
      .from(resolvedBucketName)
      .upload(filePath, file);

    console.log(data, resolvedBucketName);
    if (error) {
      console.error("Upload error", error);
      console.log(error);
      setUploading(false);
      return;
    }

    const publicURL = `https://kzgqkcieuscdyzgnlvvk.supabase.co/storage/v1/object/public/${bucketName}/${filePath}`;

    const newImages = [...images, publicURL];
    setImages(newImages);
    onChange?.(newImages);

    setUploading(false);
  };

  const deleteImage = async (index: number, url: string) => {
    setUploading(true);
    const resolvedBucketName = bucketName ?? "uploads";

    const filePath = url.split("/").slice(-2).join("/"); // Assumes URL format is consistent as previously constructed
    const { error } = await supabase.storage
      .from(resolvedBucketName)
      .remove([filePath]);

    if (error) {
      console.error("Delete error", error);
      setUploading(false);
      return;
    }

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange?.(newImages);

    setUploading(false);
  };

  const onRemove = async (urlToRemove: string) => {
    // Find index of url to remove
    const index = images.indexOf(urlToRemove);
    if (index > -1) {
      await deleteImage(index, urlToRemove);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={uploadImage}
        style={{ marginBottom: "10px" }}
      />
      <div>
        {images.map((url, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Image
              src={url}
              alt="Uploaded Image"
              width={100}
              height={100}
              unoptimized
            />
            <button
              onClick={() => deleteImage(index, url)}
              disabled={uploading}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        {/* {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                className=""
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image src={url} alt="Image" layout="fill" objectFit="cover" />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ImageUpload;
