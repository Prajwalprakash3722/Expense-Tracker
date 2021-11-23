import { React, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function DatePicker() {
  const [day, setDay] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  let StartDate = day[0].startDate.toLocaleDateString();
let EndDate = day[0].endDate.toLocaleDateString();
    console.log(StartDate, EndDate);
  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setDay([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={day}
      />
    </div>
  );
}
