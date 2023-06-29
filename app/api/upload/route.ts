import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: 'dnghvdxot',
    api_key: '513161835268257',
    api_secret: 'tsPC8yl5xLj2m0UGKM5SlRGCfXI'
});

export async function POST(request: Request) {
  try {
    const { path } = await request.json();

    if (!path) {
      return NextResponse.json({ message: "Image path is required" }, { status: 400 });
    }

    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };

    const result = await uploadImageWithRetry(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Image upload failed", error }, { status: 500 });
  }
}

async function uploadImageWithRetry(path: string, options: any, retries = 10, delay = 1000): Promise<any> {
  while (retries > 0) {
    try {
      const result = await cloudinary.uploader.upload(path, options);
      return result;
    } catch (error) {
      console.error("Image upload error:", error);
      retries--;
      await sleep(delay);
    }
  }
  throw new Error("Image upload failed after retries");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
