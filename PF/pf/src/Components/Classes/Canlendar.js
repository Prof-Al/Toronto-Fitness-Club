import { Calendar } from "@progress/kendo-react-dateinputs";
import { useState } from "react";

const PickDateOfClass = props => {
  const [date, setDate] = useState(null);

  return (
    <div className="k-my-8">
      <div className="k-mb-6 k-font-weight-bold">Select Date to see available classes</div>

      <Calendar value={date} onChange={e => setDate(e.value)} />
      <div className="k-mt-4">Selected date: {date?.toDateString()}</div>
    </div>
  );
  
};


export default PickDateOfClass;