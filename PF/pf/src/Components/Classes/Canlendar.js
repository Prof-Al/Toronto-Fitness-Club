import { Calendar } from "@progress/kendo-react-dateinputs";
import { useState, useEffect } from "react";
import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {
  Container,
} from './ClassesElement'

const PickDateOfClass = props => {
  const [date, setDate] = useState(null);
  const [dateSearch, setSearchDate] = useState(null);
  const [ classes, setClasses ] = useState(null);
  const [ idclasses, setidClasses ] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  function ChangeDateFormat(Date) {
    const array_D = Date.split(" ")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const temp =  monthNames.indexOf(array_D[1]) + 1
    const changed = array_D[3] + '-' + temp + '-' + array_D[2];
    return changed
  }

  
  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/studios/class/filter/1/?start_date=" + dateSearch
      );
      const data = await res.json();
      setClasses(data);
 
    } catch {
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
 

 
  function changeAll(e){
      const temp2 = e.value
      const temp = ChangeDateFormat(temp2?.toDateString());
      setSearchDate(temp);
      setDate(temp2);
      setClasses(null);
  } 




  useEffect(() => {
    console.log(idclasses)
    if(idclasses !== undefined && idclasses !== null){
      try {
        console.log("http://127.0.0.1:8000/studios/class/times/" + idclasses + "/enroll/")
        const res = fetch(
          "http://127.0.0.1:8000/studios/class/times/" + idclasses + "/enroll/"
        );
        const data = res.json();
        console.log(data)
   
      } catch {
        console.log("error", error);
        navigate("/Login")
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }, [idclasses])



  


  return (
    <Container className="Select_date">
      <div className="select_s">Select Date to see available classes</div>

      <Calendar value={date} onChange={e => changeAll(e)} />
      <div className="select_s">Selected date: {date?.toDateString()}</div>
      <Button  onClick={fetchClasses}>See all classes</Button>
    
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">coach</TableCell>
              <TableCell align="right">keywords</TableCell>
              <TableCell align="right">capacity</TableCell>
              <TableCell align="right">time from</TableCell>
              <TableCell align="right">time end</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.coach}</TableCell>
                <TableCell align="right">{row.keywords}</TableCell>
                <TableCell align="right">{row.capacity}</TableCell>
                <TableCell align="right">{row.time_from}</TableCell>
                <TableCell align="right">{row.time_end}</TableCell>
                <Button  variant="outlined" onClick={() =>{setidClasses(row.id)}}>enroll</Button>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
      



      
    </Container>
  );
  
};


export default PickDateOfClass;