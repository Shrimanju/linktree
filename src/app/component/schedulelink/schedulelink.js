import React, { useState, useEffect, useRef } from "react";
import './schedulelink.css';
import {Button } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const Schedulelink = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    
  return (
  <div>

    
<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid >
        <div className="startsAt">

        <KeyboardDatePicker
        className="dateinput"
          margin="normal"
          id="date-picker-dialog"
          label="Date picker"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        

        <KeyboardTimePicker
        className="timeinput"
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <Button className="schedulelinkbutton">Submit</Button>
</div>
      </Grid>
    </MuiPickersUtilsProvider>


</div>
  );
};

export default Schedulelink;
