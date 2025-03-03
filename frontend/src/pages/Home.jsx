import { useEffect, useState } from "react";
import axios from "axios";
import CalendarView from "../components/CalendarView";
import EventList from "../components/EventList";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then(res => setEvents(res.data));
  }, []);

  return (
    <div className="p-5 flex">
      <EventList events={events} />
      <CalendarView events={events} />
    </div>
  );
}

export default Home;
