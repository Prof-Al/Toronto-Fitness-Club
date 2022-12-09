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
import {useParams} from "react-router-dom";

import {
  Container,
  Calendardiv,
} from './ClassesElement'

const PickDateOfClass = props => {
  const { studio_id } = useParams();
  const [date, setDate] = useState(null);
  const [dateSearch, setSearchDate] = useState(null);
  const [ classes, setClasses ] = useState(null);
  const [ idclasses, setidClasses ] = useState(null);


  const [params, setParams] = useState({page: 1, name: "", coach: "", range_greater: "", range_smaller: "", start_date:"", end_date:""});
  const [preps, setPreps] = useState({page: 1, name: "", coach: "", range_greater: "", range_smaller: "", start_date:"", end_date:""});
  const [total, setTotal] = useState(1);

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

  

  useEffect(() => {
    const { page, name, coach, range_greater, range_smaller, start_date, end_date} = params;
    fetch(`http://127.0.0.1:8000/studios/class/filter/${studio_id}/?p=${page}&name=${name}&coach=${coach}&range_greater=${range_greater}&rannge_smaller=${range_smaller}&start_date=${start_date}&end_date=${end_date}`)
        .then(res => {
            const comp = parseInt(res.headers.get('count'));
            (comp % 5)===0 ? setTotal(Math.round(comp / 5)) : setTotal(Math.round(comp / 5) + 1);
            return res.json()
        }).then(json => {setClasses(json);})
  }, [params]) 
 

 




  useEffect(() => {
    console.log(idclasses)
    if(idclasses !== undefined && idclasses !== null){
      try {
        console.log("http://127.0.0.1:8000/studios/class/" + idclasses + "/enroll/")
        const res = fetch(
          "http://127.0.0.1:8000/studios/class/" + idclasses + "/enroll/"
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
      <div>
        <p>Studio Name
          <input
              style={{width: 100, height: 20, fontSize: 18, margin: 4}}
              value={preps.name}
              onChange={(event) => {
                  setPreps({
                      ...preps,
                      name: event.target.value,
                      page: 1,
                  })
              }}
          /></p>
          <p>Coach Name
          <input
              style={{width: 100, height: 20, fontSize: 18, margin: 4}}
              value={preps.coach}
              onChange={(event) => {
                  setPreps({
                      ...preps,
                      name: event.target.value,
                      page: 1,
                  })
              }}
          /></p>
          <p>Date duration (smaller than)
          <input
              style={{width: 100, height: 20, fontSize: 18, margin: 4}}
              value={preps.range_smaller}
              onChange={(event) => {
                  setPreps({
                      ...preps,
                      name: event.target.value,
                      page: 1,
                  })
              }}
          /></p>
          <p>Date duration (greater than)
          <input
              style={{width: 100, height: 20, fontSize: 18, margin: 4}}
              value={preps.range_greater}
              onChange={(event) => {
                  setPreps({
                      ...preps,
                      name: event.target.value,
                      page: 1,
                  })
              }}
          /></p>
          
      </div>
     

      
      <Calendardiv>
        <div>
        <div>Select Start Date to see available classes</div>
        <Calendar value={date} onChange={e =>{

          setPreps({
            ...preps,
            start_date:  ChangeDateFormat((e.value)?.toDateString()),
            page: 1,
          })
        }} />
        <div className="select_s">Selected date: {preps.start_date}</div>
        </div>
        <div>
        <div>Select end Date to see available classes</div>
        <Calendar value={date} onChange={e =>{

          setPreps({
            ...preps,
            end_date:  ChangeDateFormat((e.value)?.toDateString()),
            page: 1,
          })
        }} />
        <div className="select_s">Selected date: {preps.end_date}</div>
        </div>
      </Calendardiv>
      <div className="Calendar">
      <Button onClick={(event) => {
                setParams({
                    ...params,
                    name: preps.name,
                    coach: preps.coach,
                    range_greater: preps.range_greater,
                    range_smaller: preps.range_smaller,
                    start_date:preps.start_date,
                    end_date:preps.end_date,
                    page: 1,
                })
            }}>Search!</Button>
      <Button onClick={(event) => {
                setParams({
                    ...params,
                    name: "",
                    coach: "",
                    range_greater: "",
                    range_smaller: "",
                    start_date:"",
                    end_date:"",
                    page: 1,
                })
            }}>Reset!</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">coach</TableCell>
              <TableCell align="right">keywords</TableCell>
              <TableCell align="right">capacity</TableCell>
              <TableCell align="right">start_date</TableCell>
              <TableCell align="right">end_date</TableCell>
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
                <TableCell align="right">{row.start_date}</TableCell>
                <TableCell align="right">{row.end_date}</TableCell>
                <TableCell align="right">{row.time_from}</TableCell>
                <TableCell align="right">{row.time_end}</TableCell>
                
                <Button  variant="outlined" onClick={() =>{setidClasses(row.id)}}>enroll</Button>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <table>
        <button onClick={() => setParams({
                  ...params,
                  page: Math.max(1, params.page - 1)
              })} disabled={ params.page === 1 }>
                  prev
              </button>
              <>{ params.page }</>
              <button onClick={() => setParams({
                  ...params,
                  page: Math.min(total, params.page + 1)
              })} disabled={ params.page === total || total === 0 }>
                  next
        </button>
        
      </table>
    </Container>


  );
  
};


export default PickDateOfClass;