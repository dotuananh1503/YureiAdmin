import {
  Box,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import AuthContext from "../context";
import { getContentFromHTML, getImageURLFromContent } from "../utils";
import Chart from "./Chart";
import Loading from "./Loading";
// import PieChart from "./PieChart";

const TableAnime = () => {
  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleChangeValue = (e) => {
    let filter = authContext.animes.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPosts(filter);
  };

  useEffect(() => {
    if (authContext.animes.length > 0) {
      setPosts(authContext.animes);
    }
  }, [authContext]);

  return (
    <>
      <Box sx={{ width: "100%", m: "30px 0" }}>
        <Input
          placeholder="Tìm kiếm"
          sx={{ width: "100%" }}
          onChange={handleChangeValue}
          startAdornment={
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          }
        />
      </Box>
      <TableContainer
        component={Paper}
        key={Math.random()}
        sx={{ mt: "10px", height: posts.length > 0 ? 600 : 200 }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              ></TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              >
                Poster
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#29b0ff",
                }}
              >
                Tên phim
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              >
                Số tập
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              >
                Thể loại
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              >
                Tình trạng
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#29b0ff",
                }}
              >
                Link gốc
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ position: "relative" }}>
            {posts.length > 0 ? (
              posts.map((row, index) => (
                <>
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell key={index}>
                      <IconButton
                        key={index}
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? <FaChevronUp key={index}/> : <FaChevronDown key={index}/>}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        key={Math.random()}
                        component="img"
                        src={getImageURLFromContent(row.content)}
                        alt="temp_image"
                        width={"150px"}
                      ></Typography>
                    </TableCell>
                    <TableCell sx={{color: '#bf15bc', fontWeight: 'bold', fontSize: '1rem'}}>{row.title}</TableCell>
                    <TableCell>
                      {getContentFromHTML(row.content).fullEpisodes}
                    </TableCell>
                    <TableCell>
                      {getContentFromHTML(row.content).fullCategories.map(
                        (cat, index) => (
                          <Typography
                            key={index}
                            component="span"
                            display="block"
                            marginLeft={"10px"}
                          >
                            <Chip key={index} color="primary" sx={{backgroundColor: '#F44611', my: '3px'}} label={cat} />
                          </Typography>
                        )
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        color="primary"
                        sx={{
                          backgroundColor:
                            getContentFromHTML(row.content).fullStatus[0] ===
                            "Hoàn thành"
                              ? "#2a8f1d"
                              : getContentFromHTML(row.content)
                                  .fullStatus[0] === "Chưa hoàn thành"
                              ? "#bf1520"
                              : "#1534bf",
                        }}
                        label={getContentFromHTML(row.content).fullStatus[0]}
                      />
                    </TableCell>
                    <TableCell>{row.url}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ pb: 0, pt: 0 }}
                      colSpan={9}
                    >
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box component="p" sx={{ margin: 1, fontWeight: "bold" }}>
                          Nhân sự:{" "}
                        </Box>
                        <Box component="p" sx={{ margin: 1 }}>
                          {getContentFromHTML(row.content).fullStaffs.map(
                            (staff, index) => (
                              <Typography
                                key={index}
                                component="span"
                                display="block"
                                marginLeft={"10px"}
                                fontSize="0.875rem"
                              >
                                {staff}
                              </Typography>
                            )
                          )}
                        </Box>
                        <Box component="p" sx={{ margin: 1, fontWeight: "bold" }}>
                          Nội dung:{" "}
                        </Box>
                        <Box component="p" sx={{ margin: 1 }}>
                          {getContentFromHTML(row.content).fullSummary}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))
            ) : (
              <TableRow colSpan={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "auto",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  mt: "20px",
                }}
              >
                <Loading />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={12} md={12} xl={6}>
          <Chart
            chartTitle="Thống kê Anime theo thể loại"
            dataToShow={authContext.totalCountCategories}
          />
        </Grid>
        <Grid item xs={12} md={12} xl={6}>
          <Chart
            chartTitle="Thống kê số bộ anime mỗi thành viên tham gia"
            dataToShow={authContext.countAnimeByMember}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TableAnime;
