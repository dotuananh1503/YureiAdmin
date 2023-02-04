import { Box } from "@mui/material";

const Footer = () => {
  let currentTime = new Date();
  let year = currentTime.getFullYear();
  return (
    <Box sx={{ mt: "30px", borderTop: "1px solid #333", textAlign: "center", py: '10px'}}>
      Copyright &copy; {year} By Yurei
    </Box>
  );
};

export default Footer;
