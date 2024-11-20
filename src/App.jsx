import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaCalendarAlt,
  FaListUl,
  FaFacebookSquare,
  FaFileSignature,
  FaApple,
} from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { 
  SiGooglemaps, 
  SiWaze 
} from "react-icons/si";
import Modal from "react-modal";
import MapComponent from "./MapComponent";

Modal.setAppElement("#root");

const monthNamesInEstonian = {
  January: "Jaanuar",
  February: "Veebruar",
  March: "Märts",
  April: "Aprill",
  May: "Mai",
  June: "Juuni",
  July: "Juuli",
  August: "August",
  September: "September",
  October: "Oktoober",
  November: "November",
  December: "Detsember",
};

const openGoogleMaps = (lat, lng) => {
  const url = `https://maps.google.com/?q=${lat},${lng}`;
  window.open(url, '_blank');
};

const openWaze = (lat, lng) => {
  const url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  window.open(url, '_blank');
};

const openAppleMaps = (lat, lng) => {
  const url = `maps://?q=${lat},${lng}`;
  window.open(url, '_blank');
};


function App() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("list");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleMapApp = (lat, lng, app) => {
    let url = '';
    
    if (app === 'google') {
      url = `https://maps.google.com/?q=${lat},${lng}`;
    } else if (app === 'waze') {
      url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    }
  
    window.open(url, '_blank');
  };

  const events = [
    {
      startDate: new Date(2025, 3, 26),
      endDate: new Date(2025, 3, 26),
      title: '"Avalaks" - Eesti',
    },
    {
      startDate: new Date(2025, 4, 2),
      endDate: new Date(2025, 4, 3),
      title: '"Mulgidrift" - Raassilla, Eesti',
      coordinates: { lat: 58.248, lng: 25.748 },
    },
    {
      startDate: new Date(2025, 4, 17),
      endDate: new Date(2025, 4, 18),
      title: 'Bikernieki, Läti',
      coordinates: { lat: 56.965, lng: 24.228 },
    },
    {
      startDate: new Date(2025, 5, 13),
      endDate: new Date(2025, 5, 14),
      title: '"Jump for Drift" - Laitse RP, Eesti',
      coordinates: { lat: 59.173, lng: 24.362 },
    },
    {
      startDate: new Date(2025, 7, 8),
      endDate: new Date(2025, 7, 10),
      title: '"Southside" - Kulbilohu, Eesti',
      coordinates: { lat: 58.252, lng: 26.410 },
    },
    {
      startDate: new Date(2025, 8, 6),
      endDate: new Date(2025, 8,7),
      title: '"Witch Kettle" - Bikernieki, Läti',
      coordinates: { lat: 56.965, lng: 24.228 },
    },
    {
      startDate: new Date(2025, 8, 19),
      endDate: new Date(2025, 8, 20),
      title: '"Superfinaalid" - Kehala, Eesti',
      coordinates: { lat: 59.270, lng: 26.474 },
    },
    {
      startDate: new Date(2025, 9, 3),
      endDate: new Date(2025, 9, 5),
      title: 'Bikernieki, Läti',
      coordinates: { lat: 56.965, lng: 24.228 },
    },
  ];

   {/*{
      startDate: new Date(2024, 9, 4),
      endDate: new Date(2024, 9, 6),
      title: '"GrandFinal-FinalFight" - Bikernieki, Läti',
      fblink: "https://www.facebook.com/events/876565614228381",
      ticketlink:
        "https://www.bilesuserviss.lv/lat/biletes/sports/baltic-drift-grand-final-2024-442022/?fbclid=IwY2xjawFNi3pleHRuA2FlbQIxMAABHZtFg9bcM06D9Kjr86NEPEtmmv215DOunsTa-hBArsc1jRfcUyEmwXHJQw_aem_dwKt-YTX2UvEWnlJ-NbvgQ",
      signuplink:
        "https://l.facebook.com/l.php?u=https%3A%2F%2Fforms.gle%2FU21QcwyC5G1x7hgo7%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR38XvrDAQnSsDJ6SRW-J6ZaUCZXu0ekd_41WK4NRXOcay38_KRfKst9_BM_aem_Hixf3ZxqKKpr2azyU6gJ7A&h=AT14dSJFMFKuzw6VD0aLoXNZBw9eSvd5LMGYBKFuAnzBumJ1ZgtaJqUP92ClIFBXOzSmuoGP5fXlA1bv7dVeRA9bbpxDu_JOEMql1gh5MMoxporjChVL4KTuiUj0JxkcGGwWUH0geg&__tn__=q",
      coordinates: { lat: 56.965, lng: 24.228 },
      espcolor: "#159e8d",
      esptag: "ESP",
    },*/}

  const onDateChange = (date) => {
    setDate(date);
  };

  const toggleView = () => {
    setView(view === "calendar" ? "list" : "calendar");
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const currentMonthInEstonian =
    monthNamesInEstonian[
      new Date().toLocaleString("default", { month: "long" })
    ] +
    " " +
    new Date().getFullYear();

  const groupedEvents = events.reduce((groups, event) => {
    const month =
      monthNamesInEstonian[
        event.startDate.toLocaleString("default", { month: "long" })
      ] +
      " " +
      event.startDate.getFullYear();
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(event);
    return groups;
  }, {});

  const isDateInRange = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
  };

  const getEventsForDate = (date) => {
    return events.filter((event) =>
      isDateInRange(date, event.startDate, event.endDate)
    );
  };

  return (
    <div className="flex flex-col items-center h-screen font-sans">
      <div className="w-full max-w-[515px] py-4 px-4 flex justify-between items-center">
        <img src="./bdclogo.png" alt="" className="h-[2.5rem]" />
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={view === "calendar"}
              onChange={toggleView}
            />
            <div className="w-[4.5rem] h-10 bg-[#232220] rounded-full shadow-inner flex items-center justify-between px-1">
              <FaListUl
                className={`text-[#E8E8E8] w-[3rem] h-[rem] ${
                  view === "calendar" ? "opacity-50" : "opacity-100"
                }`}
              />
              <FaCalendarAlt
                className={`text-[#E8E8E8] w-[3rem] h-[rem] ${
                  view === "calendar" ? "opacity-100" : "opacity-50"
                }`}
              />
            </div>
            <div
              className={`absolute left-1 top-1 w-8 h-8 bg-[#E8E8E8] rounded-full shadow transform transition-transform ${
                view === "calendar" ? "translate-x-8" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
      </div>

      <div className="flex-grow flex justify-center items-start px-4 xs:w-[515px]">
        {view === "list" ? (
          <div className="w-full max-w-xl bg-[#232220] overflow-y-auto rounded-xl">
            <div className="w-full flex justify-center mt-8 mb-4">
              <h2 className="text-4xl font-bold font-main text-[#E8E8E8]">
                Ürituste List
              </h2>
            </div>
            {Object.keys(groupedEvents).map((month, index) => (
              <div
                key={index}
                className={`p-4 ${
                  month === currentMonthInEstonian ? "bg-yellow-100" : ""
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-2 font-main ${
                    month === currentMonthInEstonian
                      ? "text-yellow-700"
                      : "text-[#D3D3D2]"
                  }`}
                >
                  {month}
                </h3>
                <ul>
                  {groupedEvents[month].map((event, index) => (
                    <li
                      key={index}
                      className="py-3 pl-3 flex items-center rounded-2xl bg-[#171614] mb-4 cursor-pointer flex-col"
                      onClick={() => openModal(event)}
                    >
                      <div className="w-full flex flex-col mb-4 text-[#E8E8E8]">
                        <div className="font-main font-bold text-2xl">
                          {event.title}
                        </div>
                        <div className="font-main text-[#D3D3D2]">
                          {event.startDate.toLocaleDateString()} -{" "}
                          {event.endDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex justify-start items-start w-full gap-2">
                        {event.esptag && (
                          <div
                            className="relative group px-[0.75rem] py-[0.2rem] rounded-lg flex items-center justify-center text-white font-semibold font-main cursor-default"
                            style={{ backgroundColor: event.espcolor }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {event.esptag}
                            <span className="absolute bottom-full left-0 mb-1 w-max hidden group-hover:block text-xs text-white bg-black rounded-lg px-2 py-1">
                              {`Eesti PRO Meistrivõistlused`}
                            </span>
                          </div>
                        )}

                        {event.esstag && (
                          <div
                            className="relative group px-[0.75rem] py-[0.2rem] rounded-lg flex items-center justify-center text-white font-semibold font-main cursor-default"
                            style={{ backgroundColor: event.esscolor }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {event.esstag}
                            <span className="absolute bottom-full left-0 mb-1 w-max hidden group-hover:block text-xs text-white bg-black rounded-lg px-2 py-1">
                              {`Eesti SEMIPRO Meistrivõistlused`}
                            </span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-xl">
            <Calendar
              onChange={onDateChange}
              value={date}
              minDetail="month"
              minDate={new Date()}
              showNeighboringMonth={false}
              tileClassName={({ date }) => {
                const dayEvents = getEventsForDate(date);
                return dayEvents.length > 0 ? "rounded-lg bg-[#171614] text-md font-normal xs:text-xl xs:font-bold !border-[0.1rem] xs:!border-[0.25rem] !border-solid !border-[#232220]" : "rounded-lg bg-[#232220] text-md font-normal xs:text-xl xs:font-bold !border-[0.1rem] xs:!border-[0.25rem] !border-solid !border-[#232220]";
              }}
              tileContent={({ date }) => {
                return null;
              }}
              className="w-full h-full text-white text-xl flex flex-col items-center bg-[#232220] rounded-xl border-0 pt-5"
              onClickDay={(date) => {
                const clickedEvent = getEventsForDate(date)[0];
                if (clickedEvent) {
                  openModal(clickedEvent);
                }
              }}
            />
          </div>
        )}
      </div>

<Modal
  isOpen={modalIsOpen}
  shouldCloseOnOverlayClick={true}
  onRequestClose={closeModal}
  contentLabel="Event Details"
  overlayClassName="fixed inset-0 bg-[#171614] bg-opacity-75"
>
  <div>
    {selectedEvent && (
      <div className="w-full">
        {/* Event title and date */}
        <div className="mt-4">
          <p className="xs:text-3xl text-[#E8E8E8] font-bold font-main text-2xl">
            {selectedEvent.title}
          </p>
          <p className="text-[#D3D3D2] font-main">
            {selectedEvent.startDate.toLocaleDateString()} -{" "}
            {selectedEvent.endDate.toLocaleDateString()}
          </p>
        </div>

        {/* MapComponent */}
        
        {selectedEvent.coordinates && (
          <>
            <MapComponent coordinates={selectedEvent.coordinates} />
            <div className="mt-4 flex gap-2 w-full justify-center">
              <p className="text-xl font-main font-semibold text-[#D3D3D2]">Navigeeri:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => openGoogleMaps(selectedEvent.coordinates.lat, selectedEvent.coordinates.lng)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-main font-semibold"
                >
                  <SiGooglemaps />
                </button>
                <button
                  onClick={() => openWaze(selectedEvent.coordinates.lat, selectedEvent.coordinates.lng)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-main font-semibold"
                >
                  <SiWaze />
                </button>
                <button
                  onClick={() => openAppleMaps(selectedEvent.coordinates.lat, selectedEvent.coordinates.lng)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-main font-semibold"
                >
                  <FaApple />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Social links and other info */}
        <div className="mt-6 w-full flex justify-center gap-4 lg:gap-8">
          {selectedEvent.fblink && (
            <div className="relative group">
              <a
                href={selectedEvent.fblink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare className="w-8 h-8 text-[#D3D3D2] hover:text-[#1877F2]" />
              </a>
              <span className="absolute bottom-full left-0 mb-1 w-max hidden group-hover:block text-xs text-[#232220] bg-[#D3D3D2] rounded-lg px-2 py-1">
                Facebook Event
              </span>
            </div>
          )}
          {selectedEvent.ticketlink && (
            <div className="relative group">
              <a
                href={selectedEvent.ticketlink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoTicket className="w-8 h-8 text-[#D3D3D2] hover:text-[#FFD700]" />
              </a>
              <span className="absolute bottom-full left-0 mb-1 w-max hidden group-hover:block text-xs text-[#232220] bg-[#D3D3D2] rounded-lg px-2 py-1">
                Piletite Ost
              </span>
            </div>
          )}
          {selectedEvent.signuplink && (
            <div className="relative group">
              <a
                href={selectedEvent.signuplink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFileSignature className="w-8 h-8 text-[#D3D3D2] hover:text-white" />
              </a>
              <span className="absolute bottom-full left-0 mb-1 w-max hidden group-hover:block text-xs text-[#232220] bg-[#D3D3D2] rounded-lg px-2 py-1">
                Sõitjate Registeerimine
              </span>
            </div>
          )}
        </div>

        {/* ESP/ESS tags and close button */}
        <div className="mt-3 flex justify-between items-center w-full gap-2">
          <div className="flex items-center gap-2">
            {selectedEvent.esptag && (
              <div
                className="relative group px-[0.75rem] py-[0.2rem] rounded-lg flex items-center justify-center text-white font-semibold font-main cursor-default"
                style={{ backgroundColor: selectedEvent.espcolor }}
              >
                {selectedEvent.esptag}
                <span className="absolute bottom-full left-0 mb-1 w-max hidden group-hover:block text-xs text-white bg-black rounded-lg px-2 py-1">
                  {`Eesti PRO Meistrivõistlused`}
                </span>
              </div>
            )}
            {selectedEvent.esstag && (
              <div
                className="relative group px-[0.75rem] py-[0.2rem] rounded-lg flex items-center justify-center text-white font-semibold font-main cursor-default"
                style={{ backgroundColor: selectedEvent.esscolor }}
              >
                {selectedEvent.esstag}
                <span className="absolute bottom-full left-0 mb-1 w-max hidden group-hover:block text-xs text-white bg-black rounded-lg px-2 py-1">
                  {`Eesti SEMIPRO Meistrivõistlused`}
                </span>
              </div>
            )}
          </div>
          {/* Close button */}
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-main font-semibold"
          >
            Sulge
          </button>
        </div>
      </div>
    )}
  </div>
</Modal>


    </div>
  );
}

export default App;
