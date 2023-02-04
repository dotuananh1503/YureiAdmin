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
import { getContentFromHTML, getImageURLFromContent } from "../utils";
// import PieChart from "./PieChart";

const TableLiveAction = () => {
  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState(authContext.liveActions);

  const handleChangeValue = (e) => {
    let filter = authContext.liveActions.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPosts(filter);
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
      <TableContainer component={Paper} sx={{ mt: "10px"}}>
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
                      {getContentFromHTML(row.content).fullEpisodes}
                    </TableCell>
                    <TableCell>
                      {getContentFromHTML(row.content).fullCategories.map(
                        (cat) => (
                          <Typography
                            key={cat}
                            component="div"
                            marginLeft={"10px"}
                          >
                            <Chip
                              color="primary"
                              sx={{ backgroundColor: "#F44611", my: "3px" }}
                              label={cat}
                            />
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
                                key={staff}
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

export default TableLiveAction;
