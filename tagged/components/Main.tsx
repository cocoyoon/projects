import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { Client, Storage } from "appwrite";
import { ID } from "@/app/appwrite";

const custom_font = localFont({ src: "../fonts/utah-condensed-bold.ttf" });

const fetchAllImages = async (storage: Storage, bucket_id: string) => {
  const promise = storage.listFiles(bucket_id);
  let res = promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error); // Failure
    }
  );
  return res;
};

async function Main() {
  const project_id: string | undefined = process.env.APPWRITE_PROJECT_ID;
  const bucket_id: string | undefined = process.env.IMAGES_BUCKET_ID;
  if (!project_id || !bucket_id) {
    throw new Error("ID not provided");
  }
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(project_id);
  const storage_ref = new Storage(client);
  const images = await fetchAllImages(storage_ref, bucket_id)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-0">
      {images && images.files ? (
        images.files.map((file_id) => (
          <div key={file_id.$id}>
            <Link href={`/${file_id.$id}`} prefetch={false}>
              <Image
                alt="LOADING"
                className="w-full h-auto border border-gray-300 dark:border-gray-700"
                height="250"
                src={storage_ref
                  .getFilePreview(bucket_id, file_id.$id)
                  .toString()}
                style={{
                  aspectRatio: "200/250",
                  objectFit: "cover",
                }}
                width="200"
              />
            </Link>
          </div>
        ))
      ) : (
        // You can return a placeholder or message when images are not available
        <div>No images available</div>
      )}
    </div>
  );
}

export default Main;
