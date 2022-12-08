import { Calendar } from "@progress/kendo-react-dateinputs";
import { useState, useEffect } from "react";
import React from "react";
import {Link, useNavigate} from 'react-router-dom';
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
    <div className="Select_date">
      <div className="select_s">Select Date to see available classes</div>

      <Calendar value={date} onChange={e => changeAll(e)} />
      <div className="select_s">Selected date: {date?.toDateString()}</div>
      <button onClick={fetchClasses}>See all classes</button>
    
      
      <table>
          <thead>
          <tr>
        
              <th> id </th>
              <th> name </th>
              <th> coach </th>
              <th> keywords </th>
              <th> capacity </th>
              <th> time_from </th>
              <th> time_end </th>

          </tr>
          </thead>
          <tbody>
          {classes?.map((classes, index) => (
              <tr key={ classes.id }>
                  <td></td>
                  <td>{ classes.id }</td>
                  <td>{ classes.name }</td>
                  <td>{ classes.coach }</td>
                  <td>{ classes.keywords }</td>
                  <td>{ classes.capacity }</td>
                  <td>{ classes.time_from }</td>
                  <td>{ classes.time_end }</td>
                  <td><button onClick={() =>{setidClasses(classes.id);console.log(idclasses);}}>enroll</button></td>
              </tr>
          ))}
          </tbody>
      </table>
      



      
    </div>
  );
  
};


export default PickDateOfClass;