import { Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { getContentFromHTML, getImageURLFromContent } from "../utils";

const TableAnime = (props) => {
  const { data } = props;

  return (
    <TableContainer component={Paper} sx={{ mt: "10px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}>
              STT
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}>
              Poster
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#29b0ff",
                width: "200px",
              }}
            >
              Tên phim
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}>
              Số tập
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}>
              Thể loại
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}>
              Tình trạng
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}>
              Nhân sự
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#29b0ff" }}>
              Nội dung
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
          {data ? (
            data.map((row, index) => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    key={Math.random()}
                    component="img"
                    src={getImageURLFromContent(row.content)}
                    alt="temp_image"
                    width={"100px"}
                  ></Typography>
                </TableCell>
                <TableCell sx={{ width: "200px" }}>{row.title}</TableCell>
                <TableCell>
                  {getContentFromHTML(row.content).fullEpisodes}
                </TableCell>
                <TableCell>
                  {getContentFromHTML(row.content).fullCategories.map((cat) => (
                    <Typography component="p" marginLeft={"10px"}>
                      {cat}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>Đang cập nhật...</TableCell>
                <TableCell>
                  {getContentFromHTML(row.content).fullStaffs.map((staff) => (
                    <Typography component="p" marginLeft={"10px"}>
                      {staff}
                    </Typography>
                  ))}
                </TableCell>
                <Tooltip title={getContentFromHTML(row.content).fullSummary}>
                  <TableCell>
                    {getContentFromHTML(row.content).fullSummary.slice(0, 120)}
                    ...
                  </TableCell>
                </Tooltip>
                <TableCell>{row.url}</TableCell>
              </TableRow>
            ))
          ) : (
            <>Loading...</>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableAnime;
