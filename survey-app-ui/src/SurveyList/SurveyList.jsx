import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
const baseURL="https://survey-app-service.onrender.com"
function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    // Fetch survey data from the server
    setIsUserAdmin(!!localStorage.getItem("token")?true:false);
    if(!!localStorage.getItem("token"))
    axios.get(baseURL+'/api/get-surveys', {headers: { Authorization: localStorage.getItem("token") }}).then((response) => {
      setSurveys(response.data);
    }).catch(err=>
      {
        setIsUserAdmin(false);
      });
  }, []);

  return (
    <div style={{padding:5}}>
      <h1>Survey List</h1>
     {isUserAdmin?(<div style={{padding:10}}>
      <h2>Previous Survey Submissions</h2>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {surveys.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.nationality}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>):( <h2>For Previous Survey Submissions Please Login First <a href="/login">Click here to Login </a></h2>)
}

    </div>
  );
}

export default SurveyList;
