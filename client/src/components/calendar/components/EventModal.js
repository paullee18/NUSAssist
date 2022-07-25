import React, { useContext, useState } from "react";
import { editEvent, addToDB, deleteFromDB } from "../../../services/calendarServices";
import GlobalContext from "../context/GlobalContext";
import Stack from '@mui/material/Stack';

// const labelsClasses = [
//   "blue",
//   "orange",
//   "yellow",
//   "greeen",
//   "blue",
// ];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    selectedEvent,
    uid,
    tokenPromise
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.desc : ""
  );
  const [begin, setBegin] = useState(selectedEvent ? selectedEvent.startTime : "");

  const [end, setEnd] = useState(selectedEvent ? selectedEvent.endTime : "")
  // const [selectedLabel, setSelectedLabel] = useState(
  //   selectedEvent
  //     ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
  //     : labelsClasses[0]
  // );

  function handleSubmit(e) {
    e.preventDefault();
    
    const calendarEvent = {
      "title": title,
      "desc": description,
      "day": daySelected.valueOf(),
      // label: "blue",
      "id": selectedEvent ? selectedEvent.id : Date.now(),
      "uid": uid,
      "startTime": begin,
      "endTime": end,
    };
    if (selectedEvent) {
      editEvent(selectedEvent._id, calendarEvent, tokenPromise);
    } else {
      addToDB(calendarEvent, tokenPromise);
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4" onSubmit={handleSubmit}>
        <header className="bg-gray-100 px-3 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>

          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  deleteFromDB(uid, selectedEvent._id, tokenPromise)
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="px-3 py-1">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <label htmlFor="Title" className="my-2 font-link" style={{fontWeight: 'bold'}}>
                 Enter Title : 
               </label>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="w-100 my-1 p-2 font-link"
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <p> <span style={{fontWeight: 'bold'}}>Date:</span> {daySelected.format("dddd, MMMM DD")}</p>
            <label htmlFor="description" className="my-2 font-link"  style={{fontWeight: 'bold'}}>
                 Enter Description : 
               </label>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              className="w-100 my-1 p-2 font-link"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="my-2 font-link"  style={{fontWeight: 'bold'}}>
                 Start Time : 
               </label>

            <input
              type="time"
              name="begin"
              value={begin}
              required
              className="w-100 my-1 p-2 font-link"
              onChange={(e) => setBegin(e.target.value)}
            />

            <label className="my-2 font-link"  style={{fontWeight: 'bold'}}>
                 End Time : 
               </label>

            <input
              type="time"
              name="end"
              value={end}
              required
              className="w-100 my-1 p-2 font-link"
              onChange={(e) => 
              setEnd(e.target.value)
              }
            />
          </div>
        </div>
        <footer className="flex justify-between items-center border-t p-3 mt-5">
        {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
              >
                Delete    
              </button>
            )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}