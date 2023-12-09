import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { Client, Storage } from "appwrite";
import { init_client, init_storage, get_file_preview } from "@/app/appwrite";
import AppContextProvider from "./hooks/context";

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
  const bucket_id: string | undefined = process.env.IMAGES_BUCKET_ID;
  if (!bucket_id) {
    throw new Error("ID not provided");
  }
  const client = init_client("https://cloud.appwrite.io/v1");
  const storage_ref = init_storage(client);
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
        images.files.map((file) => (
          <div key={file.$id}>
            <AppContextProvider>
              <Link href={`images/${file.$id}`} prefetch={false}>
                {/* ToDo: Optimize */}
                <Image
                  alt="LOADING"
                  className="w-full h-auto border border-gray-300 dark:border-gray-700"
                  height="250"
                  src={get_file_preview(storage_ref, file.$id)}
                  style={{
                    aspectRatio: "200/250",
                    objectFit: "cover",
                  }}
                  width="200"
                />
              </Link>
            </AppContextProvider>
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
