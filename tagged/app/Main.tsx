import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { Client, Storage } from "appwrite";
import { ID } from "@/app/appwrite";

const custom_font = localFont({ src: "../fonts/utah-condensed-bold.ttf" });

const fetchAllImages = async (project_id: string, bucket_id: string) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(project_id);
  const storage = new Storage(client);
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
    throw new Error(
      "APPWRITE_PROJECT_ID is not provided in the environment variables."
    );
  }
  const images = await fetchAllImages(project_id, bucket_id)
    .then((data) => {
      console.log("Success");
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  var ids: string[] = [];
  images &&
    images.files.map((file) => {
      ids.push(file.$id);
    });
  console.log(ids);

  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-0">
      {ids.map((file_id) => {
        const client = new Client()
          .setEndpoint("https://cloud.appwrite.io/v1")
          .setProject(project_id);
        const storage = new Storage(client);
        const img_src = storage.getFilePreview(bucket_id, file_id);
        return (
          <div key={file_id}>
            <Link href={`/images/${file_id}`} prefetch={false}>
              <Image
                alt="LOADING"
                className="w-full h-auto border border-gray-300 dark:border-gray-700"
                height="250"
                src={img_src}
                style={{
                  aspectRatio: "200/250",
                  objectFit: "cover",
                }}
                width="200"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Main;
