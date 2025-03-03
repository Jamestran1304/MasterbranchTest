function EventList({ events }) {
  return (
    <div className='w-1/3 bg-gray-100 p-3 rounded shadow-md'>
      <h2 className='text-lg font-bold mb-3'>Upcoming Events</h2>
      {events.map((event) => (
        <div key={event.id} className='p-2 bg-white mb-2 rounded shadow'>
          <p className='font-bold'>{event.title}</p>
          <p>{new Date(event.startTime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default EventList;
