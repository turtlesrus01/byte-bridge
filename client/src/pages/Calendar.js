// import React, {useState} from "react";
// import '../App.css';
// import {Calendar, dateFnsLocalizer} from'react-big-calendar';
// import { useQuery, useMutation, gql } from '@apollo/client';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from "date-fns/getDay";
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// // import DatePicker from "react-datepicker";


// const GET_CALENDAR_EVENTS = gql`
//   query GetCalendarEvent {
//     CalendarEvent {
//       _id
//       description
//       title
//       startDate
//       endDate
//       location
//       allDay
//       UserId
//     }
//   }
// `;

// const addCalendarEvent = gql`
//   mutation AddCalendarEvent($event: CalendarEventInput!) {
//     addCalendarEvent(event: $event) {
//       _id
//       title
//       description
//       startDate
//       endDate
//       location
//       allDay
//       UserId
//     }
//   }
// `;

// const UpdateCalendarEvent = gql`
//   mutation UpdateCalendarEvent($userId: ID!, $startDate: String!, $endDate: String!, $location: String!) {
//     updateCalendarEvent(UserID: $userId, startDate: $startDate, endDate: $endDate, location: $location) {
//       userID
//       startDate
//       endDate
//       location
//     }
//   }
// `;

// const DELETE_CALENDAR_EVENT = gql`
//   mutation DeleteCalendarEvent($event: CalendarEventInput!) {
//     deleteCalendarEvent(event: $event) {
//       _id
//       title
//       description
//       startDate
//       endDate
//       location
//       allDay
//       UserId
//     }
//   }
//   `;

// // const event = [


// // const event = [
// //     {
// //         id: 1,
// //         title: 'All Day Event',
// //         start: new Date(2020, 0, 1),
// //         end: new Date(2020, 0, 3),
// //         allDay: true,
// //     },
// //     {
// //         id: 2,
// //         title: 'Long Event',
// //         start: new Date(2020, 0, 4, 10, 30),
// //         end: new Date(2020, 0, 4, 12, 0),
// //     },
// //     {
// //         id: 3,
// //         title: 'Repeating Event',
// //         start: new Date(2020, 0, 5, 16, 0),
// //         allDay: false,
// //     },
// // ];


// function EventCalendar() {
//     const [selectedDate, setSelectedDate] = useState(new Date());
  
//     // Fetch calendar events using the useQuery hook
//     const { loading, data } = useQuery(GET_CALENDAR_EVENTS);
  
//     // // Add calendar event using the useMutation hook
//     // const [addCalendarEvent] = useMutation(ADD_CALENDAR_EVENT, {
//     //     refetchQueries: [{ query: GET_CALENDAR_EVENTS }],
//     // });
  
//     // Handle calendar event selection
//     const handleSelectEvent = (event) => {
//       setSelectedDate(event.start);
//     };
  
//     // Handle date selection
//     const handleSelectDate = (date) => {
//       setSelectedDate(date);
//     };
  
//     // Handle event creation
//     const handleCreateEvent = () => {
//       const newEvent = {
//         title: 'New Event',
//         start: selectedDate,
//         end: selectedDate,
//       };
  
//       // Call the addCalendarEvent mutation
//       addCalendarEvent({
//         variables: { event: newEvent },
//         refetchQueries: [{ query: GET_CALENDAR_EVENTS }],
//       });
//     };

//     // Handle event deletion
//     const [deleteCalendarEvent] = useMutation(DELETE_CALENDAR_EVENT, {
//       refetchQueries: [{ query: GET_CALENDAR_EVENTS }],
//     });
    
//     const handleDeleteEvent = (event) => {
//       deleteCalendarEvent({
//         variables: { event: event },
//       });
//     };

//     // const updateCalendarEvent = useMutation(UPDATE_CALENDAR_EVENT, {
//     //   refetchQueries: [{ query: GET_CALENDAR_EVENTS }],
//     // });

  
//       const UpdateCalendarEvent  = () => {
//         const UpdateCalendarEvent = {
//           userID: String,
//           startDate: String,
//           endDate: String,
//           location: String,
//         };
//       };
        
      
  
//     if (loading) {
//       return <div>Loading...</div>;
//     }

//     const locales = {
//       'en-US': require('date-fns/locale/en-US'),
//   };
//   const localizer = dateFnsLocalizer({
//       format,
//       parse,
//       startOfWeek,
//       getDay,
//       locales,
//   });
  
//   const MyCalendar = (props) => {
//     if (loading) {
//       return <div>Loading...</div>;
//     } else {
//     return (
//         <div>
//           <div style={{ marginBottom: '10px' }}>
//             <button onClick={handleCreateEvent}>Create Event</button>
//           </div>
//           <Calendar
//             localizer={localizer}
//             events={data.calendarEvents}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500, margin: '50px' }}
//             selected={selectedDate}
//             onSelectEvent={handleSelectEvent}
//             onSelectSlot={handleDeleteEvent}
//             onSelectDate={handleSelectDate}
//             eventPropGetter={({ event }) => {
//               return {
//                 userID: String,
//                 title: String,
//                 start: String,
//                 end: String
//               }
//             }}

          
          
            

//             defaultDate={new Date()}
//             defaultView="month"
//             views={['month', 'week', 'day']}
//             step={30}
//             // defaultDate={new Date()}
//             showMultiDayTimes
//             timeslots={2}
//             daySize={30}
//             resizable
//             dayMaxEvents={true}
//             eventLimit={true}
          
//           />
//         </div>
//       );
//     };
//   };
// };

  
    
//     export default MyCalendar;



