import { useState, useEffect } from "react";
import "./App.scss";
import { CalendarBody } from "./components/CalendarBody";
import { CalendarHeader } from "./components/CalendarHeader";
import { TodoModal } from "./components/TodoModal";
import moment from "moment";

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });

  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const [startListDay, setStartListDay] = useState(
    moment().startOf("month").startOf("week")
  );
  const [endListDay, setEndListDay] = useState(
    moment().endOf("month").endOf("week")
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const prevMonth = () => {
    const nextMonth = currentDate.clone().subtract(1, "month");
    setCurrentDate(nextMonth);
  };

  const nextMonth = () => {
    const nextMonth = currentDate.clone().add(1, "month");
    setCurrentDate(nextMonth);
  };

  useEffect(() => {
    setStartListDay(currentDate.clone().startOf("month").startOf("week"));
    setEndListDay(currentDate.clone().endOf("month").endOf("week"));
  }, [currentDate]);

  return (
    <div className="calendar">
      <div className="calendar__inner">
        <div className="calendar__header-wrapper">
          <CalendarHeader
            openModal={openModal}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            month={currentDate.format("MMMM")}
            year={currentDate.format("YYYY")}
          />
        </div>
        <div className="calendar__body-wrapper">
          <CalendarBody firstDay={startListDay} lastDay={endListDay} />
        </div>
      </div>
      {showModal && <TodoModal closeModal={closeModal} />}
    </div>
  );
}

export default App;
