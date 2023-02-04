import {
  Box,
  Chip,
  Collapse,
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
import React, { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import AuthContext from "../context";
import {
  getContentComicFromHTML,
  getImageURLFromContent,
  getLabelComic,
} from "../utils";
// import PieChart from "./PieChart";

const TableComic = () => {
  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState(authContext.comics);

  const handleChangeValue = (e) => {
    let filter = authContext.comics.items.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPosts({ ...posts, items: filter });
  };

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
      <TableContainer component={Paper} sx={{ mt: "10px", height: 600 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
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
                Tên truyện
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              >
                Số chap
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              >
                Năm phát hành
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              >
                Tác giả
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}
              >
                Họa sĩ
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
          <TableBody>
            {posts ? (
              posts.items.map((row, index) => (
                <>
                  <TableRow
                    key={row}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton
                        key={index}
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? <FaChevronUp /> : <FaChevronDown />}
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
                    <TableCell
                      sx={{
                        color: "#bf15bc",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell>
                      {getContentComicFromHTML(row.content).fullChapters}
                    </TableCell>
                    <TableCell>
                      {getContentComicFromHTML(row.content).fullReleaseYear}
                    </TableCell>
                    <TableCell>
                      {getContentComicFromHTML(row.content).fullAuthors.map(
                        (author) => (
                          <Box key={author}>
                            <Chip sx={{ mt: "3px" }} label={author} />
                          </Box>
                        )
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getContentComicFromHTML(row.content).fullArtists}
                      />
                    </TableCell>
                    <TableCell>{row.url}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={9}
                    >
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, fontWeight: "bold" }}>Điểm:</Box>
                        <Box sx={{ margin: 1 }}>
                          {getLabelComic(row.labels).fullScores}
                        </Box>
                        <Box sx={{ margin: 1, fontWeight: "bold" }}>Tags: </Box>
                        <Box sx={{ margin: 1 }}>
                          {getLabelComic(row.labels).fullTags.map((tag) => (
                            <Typography
                              key={tag}
                              component="span"
                              marginLeft={"5px"}
                            >
                              <Chip
                                color="primary"
                                sx={{ backgroundColor: "#F44611", my: "3px" }}
                                label={tag}
                              />
                            </Typography>
                          ))}
                        </Box>
                        <Box sx={{ margin: 1, fontWeight: "bold" }}>
                          Nội dung:{" "}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                          {getContentComicFromHTML(row.content).fullSummary}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))
            ) : (
              <>Loading...</>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComic;
