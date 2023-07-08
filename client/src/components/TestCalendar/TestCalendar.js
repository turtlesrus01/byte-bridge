import { useState } from 'react';
import Calendar from 'react-calendar';
import '../../../src/App.css';
// import 'react-calendar/dist/Calendar.css';
 
function TestCalendar() {
  const [date, setDate] = useState(new Date([
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    
  ]));
 
  return (
    <div className='app'>
      <h1 className='text-center'>Book Your Appointment with Your Realtor</h1>
      <div className='calendar-container'>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
        />
      </div>
      {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )}
      <Calendar
          onChange={setDate}
          value={date}
          nextLabel='month>>'
          nextAriaLabel='Go to next month'
          next2Label='year>>'
          next2AriaLabel='Go to next year'
          prevLabel='<<month'
          prevAriaLabel='Go to prev month'
          prev2Label='<<year'
          prev2AriaLabel='Go to prev year'
      />
    </div>
  );
}

 
export default TestCalendar;