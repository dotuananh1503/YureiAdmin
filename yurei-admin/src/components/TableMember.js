import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

const TableMember = (props) => {
  const { data } = props;


  return (
    <TableContainer component={Paper} sx={{mt: '10px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>STT</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Tên thật</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Nickname</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Năm sinh</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Giới tính</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Tỉnh/ Thành</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Team</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Vị trí</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Hoạt động</TableCell>
            <TableCell sx={{fontWeight: 'bold', backgroundColor: '#29b0ff'}}>Tổng quan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? data.map((row, index) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row["Tên thật"]}
              </TableCell>
              <TableCell>{row["Nickname"]}</TableCell>
              <TableCell>{row["Năm sinh"]}</TableCell>
              <TableCell>{row["Giới tính"]}</TableCell>
              <TableCell>{row["Tỉnh/ Thành"]}</TableCell>
              <TableCell>{row["Team"]}</TableCell>
              <TableCell>{row["Vị trí"]}</TableCell>
              <TableCell>{row["Hoạt động"]}</TableCell>
              <TableCell>{row["Tổng quan"]}</TableCell>
            </TableRow>
          )): <>Loading...</>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableMember;