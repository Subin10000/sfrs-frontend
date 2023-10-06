import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function TeacherList() {
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/teacher');
        setTeacherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell align="right">COLOR</TableCell>
            <TableCell align="right">CAPACITY</TableCell>
            <TableCell align="right">FUEL</TableCell>
            <TableCell align="right">PRICE(Rs)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teacherData.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.capacity}</TableCell>
              <TableCell align="right">{row.fuel}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
