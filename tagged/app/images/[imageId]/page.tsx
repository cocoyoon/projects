/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HgS8cvvQI49
 */

"use client";

import axios from "axios";
import npyjs from "npyjs";
import * as ort from "onnxruntime-web";
import { useState, useEffect, useContext } from "react";
// import Image from "next/image";
import { Client, Storage } from "appwrite";
import { handleImageScale } from "@/components/helpers/scaleHelper";
import { modelScaleProps } from "@/components/helpers/Interfaces";
import { onnxMaskToImage } from "@/components/helpers/maskUtils";
import { modelData } from "@/components/helpers/onnxModelAPI";
import AppContext from "@/components/hooks/createContext";
import Stage from "@/components/Stage";
import AppContextProvider from "@/components/hooks/context";

type PageProps = {
  params: {
    imageId: string;
  };
};

function ImageDetail({ params: { imageId } }: PageProps) {
  const {
    clicks: [clicks],
    image: [, setImage],
    maskImg: [, setMaskImg],
  } = useContext(AppContext)!;
  const [image_src, set_image_src] = useState("");
  const [model, setModel] = useState<ort.InferenceSession | null>(null); // ONNX model
  const [img_embbeding, setImageEmbedding] = useState<ort.Tensor | null>(null); // Image embedding tensor
  const [tensor, setTensor] = useState<ort.Tensor | null>(null); // Image embedding tensor
  // The ONNX model expects the input to be rescaled to 1024.
  // The modelScale state variable keeps track of the scale values.
  const [modelScale, setModelScale] = useState<modelScaleProps | null>(null);

  const loadImage = async (url: URL) => {
    try {
      const img = new Image();
      img.src = url.href;
      img.onload = () => {
        const { height, width, samScale } = handleImageScale(img);
        setModelScale({
          height: height, // original image height
          width: width, // original image width
          samScale: samScale, // scaling factor for image which has been resized to longest side 1024
        });
        img.width = width;
        img.height = height;
        setImage(img);
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Decode a Numpy file into a tensor.
  const set_npy_tensor = (array_buffer: any) => {
    let npLoader = new npyjs();
    const npArray = npLoader.parse(array_buffer);
    const tensor = new ort.Tensor(npArray.data, npArray.shape);
    console.log("Complete convert to tensor!");
    setTensor(tensor);
  };

  useEffect(() => {
    console.log(imageId);
    const project_id = process.env.NEXT_PUBLIC_PROJECT_ID;
    const bucket_id: string | undefined =
      process.env.NEXT_PUBLIC_IMAGES_BUCKET_ID;
    if (!project_id || !bucket_id) {
      throw new Error("ID not provided");
    }
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(project_id);
    const storage_ref = new Storage(client);
    axios
      .post(`http://127.0.0.1:8000/process_image`, {
        image_id: imageId,
      })
      .then((response) => {
        // Process the response data here
        let res = response.data;
        console.log(res);
        const init_model = async () => {
          try {
            const quantized_onnx = atob(res.quantized_onnx_base64);
            var onnx_bytes = new Uint8Array(quantized_onnx.length);
            for (var i = 0; i < quantized_onnx.length; i++) {
              onnx_bytes[i] = quantized_onnx.charCodeAt(i);
            }
            const model = await ort.InferenceSession.create(onnx_bytes);
            setModel(model);

            let image_src = storage_ref.getFilePreview(bucket_id, imageId);
            // Load the image into the model.
            loadImage(image_src);
            set_image_src(image_src.toString());

            const img_embedding = atob(res.img_embedding);
            var uint8arr = new Uint8Array(img_embedding.length);
            for (var i = 0; i < img_embedding.length; i++) {
              uint8arr[i] = img_embedding.charCodeAt(i);
            }
            const float32Arr = new Float32Array(uint8arr.buffer);
            console.log("float32Arr", float32Arr);
            const tensor = new ort.Tensor(
              "float32",
              float32Arr,
              [1, 256, 64, 64]
            );
            setTensor(tensor);
          } catch (e) {
            console.log(e);
          }
        };

        init_model();
        // Load the image
        // loadImage(image_src);

        // Load the Segment Anything pre-computed embedding
        // Promise.resolve(loadNpyTensor(IMAGE_EMBEDDING, "float32")).then(
        //   (embedding) => setTensor(embedding)
        // );
      });
  }, []);

  // Run the ONNX model every time clicks has changed
  useEffect(() => {
    runONNX();
  }, [clicks]);

  const runONNX = async () => {
    try {
      if (
        model === null ||
        clicks === null ||
        tensor === null ||
        modelScale === null
      )
        return;
      else {
        // Preapre the model input in the correct format for SAM.
        // The modelData function is from onnxModelAPI.tsx.
        const feeds = modelData({
          clicks,
          tensor,
          modelScale,
        });
        if (feeds === undefined) return;
        // Run the SAM ONNX model with the feeds returned from modelData()
        const results = await model.run(feeds);
        const output = results[model.outputNames[0]];
        // The predicted mask returned from the ONNX model is an array which is
        // rendered as an HTML image using onnxMaskToImage() from maskUtils.tsx.
        setMaskImg(
          onnxMaskToImage(output.data, output.dims[2], output.dims[3])
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <Stage />;
}

export default ImageDetail;
