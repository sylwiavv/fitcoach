import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./../../app/styles/calendar.css";

const ClientPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const onDayClick = (value: Date) => {
    const dateString = value.toISOString().split("T")[0];
    navigate(`/client/${clientId}/training/${dateString}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-eerieBlack">
        Podopieczny {clientId}
      </h1>

      <div className="calendar-container bg-ghost-white p-6 rounded-2xl shadow-md">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={onDayClick}
          prev2Label={null}
          next2Label={null}
          tileClassName={({ date, view }) => {
            const trainingDays = ["2025-11-14", "2025-11-16"];
            if (trainingDays.includes(date.toISOString().split("T")[0])) {
              return "has-training";
            }
            return "";
          }}
        />
      </div>
    </div>
  );
};

export default ClientPage;
