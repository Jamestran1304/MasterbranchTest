import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

function CalendarView({ events }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className='p-4 bg-white rounded shadow-md w-2/3'>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <h3 className='mt-3 font-bold'>
        Events on {selectedDate.toDateString()}:
      </h3>
      <ul className='space-y-2'>
        {events
          .filter(
            (event) =>
              new Date(event.startTime).toDateString() ===
              selectedDate.toDateString()
          )
          .map((event) => (
            <li key={event.id} className='mt-2 p-2 bg-blue-100 rounded shadow'>
              {event.title} ({new Date(event.startTime).toLocaleTimeString()})
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CalendarView;
