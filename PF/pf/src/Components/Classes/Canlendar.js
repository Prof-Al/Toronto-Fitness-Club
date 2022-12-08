import { Calendar } from "@progress/kendo-react-dateinputs";
import { useState, useEffect } from "react";
import React from "react";
import APIContextc, {useAPIContext} from "../../Contexts/APIContextc";
import ClassesTable from "./ClassesTable";
const PickDateOfClass = props => {
  const [date, setDate] = useState(null);
  const { setClasses } = useAPIContext(APIContextc);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/studios/class/filter/1/?start_date=2022-12-08")
    .then(response => response.json())
    .then((jsonData) => {
      // jsonData is parsed json object received from url
      console.log(jsonData)
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    })
  })
  
  return (
    <div className="Select_date">
      <div className="select_s">Select Date to see available classes</div>

      <Calendar value={date} onChange={e => {
        setDate(e.value)
        console.log(date)}} />
      <div className="select_s">Selected date: {date?.toDateString()}</div>
      <APIContextc.Provider value={useAPIContext}>
                <ClassesTable />
      </APIContextc.Provider>
    </div>
  );
  
};


export default PickDateOfClass;