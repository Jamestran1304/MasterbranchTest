import { useState } from 'react';
import axios from 'axios';

function EventForm() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [interval, setInterval] = useState(1);
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      startTime,
      endTime,
      type: 'appointment',
      recurrence: { frequency: recurrence, interval, endDate },
    };

    await axios.post('http://localhost:5000/api/events', newEvent);
    alert('Event added!');
  };

  return (
    <div className='p-5 bg-white rounded shadow-md w-full max-w-lg'>
      <h2 className='text-lg font-bold mb-3'>Add New Event</h2>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <input
          className='border p-2 w-full rounded'
          type='text'
          placeholder='Event Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className='border p-2 w-full rounded'
          type='datetime-local'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          className='border p-2 w-full rounded'
          type='datetime-local'
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <label className='block font-bold'>Recurrence</label>
        <select
          className='border p-2 w-full rounded'
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          <option value='none'>None</option>
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
        </select>

        {recurrence !== 'none' && (
          <>
            <label className='block font-bold'>Interval</label>
            <input
              className='border p-2 w-full rounded'
              type='number'
              value={interval}
              min='1'
              onChange={(e) => setInterval(e.target.value)}
            />

            <label className='block font-bold'>End Date</label>
            <input
              className='border p-2 w-full rounded'
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </>
        )}

        <button
          className='bg-blue-500 text-white px-4 py-2 rounded w-full'
          type='submit'
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;
