import { Button } from "@mui/material";
import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "dxqpit0yk",
      uploadPreset: "b6imdvzc",
      folder: "Yurei",
      sources: ["local"]
    }, (error, result) => {
        console.log(result)
    });
  }, []);

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={() => widgetRef.current.open()}
    >
      Upload
    </Button>
  );
};

export default UploadWidget;
