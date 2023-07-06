import React, {useState} from "react";

import '../App.css';
import {Calendar, dateFnsLocalizer} from'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import DatePicker from "react-datepicker";

const locales = {
    'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        id: 1,
        title: 'All Day Event',
        start: new Date(2020, 0, 1),
        end: new Date(2020, 0, 3),
        allDay: true,
    },
    {
        id: 2,
        title: 'Long Event',
        start: new Date(2020, 0, 4, 10, 30),
        end: new Date(2020, 0, 4, 12, 0),
    },
    {
        id: 3,
        title: 'Repeating Event',
        start: new Date(2020, 0, 5, 16, 0),
        allDay: false,
    },
];

// function App() {
//     return (
//         <div className="App">
//             <Calendar localizer={localizer} events={events} 
//             startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
//         </div>
//     );
// }

// export default App;



function EventCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{height: 500, margin: "50px"}}
            selected={selectedDate}
            onSelectEvent={setSelectedDate}
        />
    );
}

export default EventCalendar;


