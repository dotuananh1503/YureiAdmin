import { Box } from "@mui/material";
import Header from "../components/Header";
import UploadWidget from "../components/UploadWidget";

const Images = () => {
  return (
    <Box sx={{ display: "flex", height: "100%", width: '100%', flexDirection: "column"}}>
      <Header />
      <Box sx={{width: '100%', mt: '20px'}} className="flex-center">
        <UploadWidget />
      </Box>
      <Box>
        Images...
      </Box>
    </Box>
  );
};

export default Images;
