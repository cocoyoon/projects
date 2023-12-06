/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HgS8cvvQI49
 */

export default function Component() {
  return (
    <div key="1" className="flex flex-col bg-white">
      <div className="grid grid-cols-3 gap-4 p-4 w-3/5 mx-auto">
        <div className="col-span-2">
          <img
            alt="Content"
            className="w-full h-auto rounded-lg bg-gray-300"
            height="500"
            src="/next.svg"
            style={{
              aspectRatio: "500/500",
              objectFit: "fill",
            }}
            width="500"
          />
        </div>
        <div className="space-y-4 border-2 bg-gray-300 rounded-lg">detail</div>
      </div>
      <div className="p-4">
        <div className="font-bold text-black text-xl">More to explore</div>
        <div className="grid grid-cols-6 gap-4 mt-4">
          <img
            alt="Explore 1"
            className="w-full h-auto rounded-lg bg-gray-300"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <img
            alt="Explore 2"
            className="w-full h-auto rounded-lg bg-gray-300"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <img
            alt="Explore 3"
            className="w-full h-auto rounded-lg bg-gray-300"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <img
            alt="Explore 4"
            className="w-full h-auto rounded-lg bg-gray-300"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <img
            alt="Explore 5"
            className="w-full h-auto rounded-lg bg-gray-300"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <img
            alt="Explore 6"
            className="w-full h-auto rounded-lg bg-gray-300"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
        </div>
      </div>
    </div>
  );
}
