import { Box, Collapse, IconButton, Input, InputAdornment, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { getContentFromHTML, getImageURLFromContent } from "../utils";

const TableAnime = (props) => {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState(data);

  const handleChangeValue = (e) => {
    let filter = data.filter(item => item.title.includes(e.target.value));
    setPosts(filter);
  }
 
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
      <TableContainer component={Paper} sx={{ mt: "10px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  width: "100px",
                }}
              >
                Link gốc
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts ? (
              posts.map((row, index) => (
                <>
                  <TableRow
                    key={row}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton
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
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      {getContentFromHTML(row.content).fullEpisodes}
                    </TableCell>
                    <TableCell>
                      {getContentFromHTML(row.content).fullCategories.map(
                        (cat) => (
                          <Typography component="p" marginLeft={"10px"}>
                            {cat}
                          </Typography>
                        )
                      )}
                    </TableCell>
                    <TableCell>Đang cập nhật...</TableCell>
                    <TableCell>{row.url}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={9}
                    >
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          {/* <Typography variant="h6" gutterBottom component="div">
                          Thông tin thêm
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nhân sự</TableCell>
                              <TableCell>Customer</TableCell>
                              <TableCell align="right">Amount</TableCell>
                              <TableCell align="right">
                                Total price ($)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.history.map((historyRow) => (
                              <TableRow key={historyRow.date}>
                                <TableCell component="th" scope="row">
                                  {historyRow.date}
                                </TableCell>
                                <TableCell>{historyRow.customerId}</TableCell>
                                <TableCell align="right">
                                  {historyRow.amount}
                                </TableCell>
                                <TableCell align="right">
                                  {Math.round(
                                    historyRow.amount * row.price * 100
                                  ) / 100}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table> */}
                        </Box>
                        <Box sx={{ margin: 1, fontWeight: "bold" }}>
                          Nhân sự:{" "}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                          {getContentFromHTML(row.content).fullStaffs.map(
                            (staff) => (
                              <Typography
                                component="p"
                                marginLeft={"10px"}
                                fontSize="0.875rem"
                              >
                                {staff}
                              </Typography>
                            )
                          )}
                        </Box>
                        <Box sx={{ margin: 1, fontWeight: "bold" }}>
                          Nội dung:{" "}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                          {getContentFromHTML(row.content).fullSummary}
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

export default TableAnime;
