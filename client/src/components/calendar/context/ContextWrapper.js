import React, {
    useState,
    useEffect,
    useReducer,
    useMemo,
  } from "react";
  import GlobalContext from "./GlobalContext";
  import dayjs from "dayjs";
  import { useAuth } from "../../../hooks/useAuth";
  import { getEvents, addToDb, deleteFromDB, editEvent } from "../../../services/calendarServices";
  
  // function savedEventsReducer(state, { type, payload }) {
  //   switch (type) {
  //     case "push":
  //       return [...state, payload];
  //     case "update":
  //       return state.map((evt) =>
  //         evt.id === payload.id ? payload : evt
  //       );
  //     case "delete":
  //       return state.filter((evt) => evt.id !== payload.id);
  //     default:
  //       throw new Error();
  //   }
  // }

  // function initEvents() {
  //   const storageEvents = localStorage.getItem("savedEvents");
  //   const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  //   return parsedEvents;
  // }
  
  export default function ContextWrapper(props) {
    const [ events, setEvents ] = useState([]);
    const { user } = useAuth();
    const uid = user.uid;
    const tokenPromise = user.getIdToken();
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    // const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    // const [savedEvents, dispatchCalEvent] = useReducer(
    //   savedEventsReducer,
    //   [],
    //   events
    // );
  
    useEffect(() => {
      const fetchEntries = async (uid) => {
        const fetchedEntries = await getEvents(uid, tokenPromise);
        setEvents(fetchedEntries);
      }
      fetchEntries(uid);
    
    }, [events]);

    // const filteredEvents = useMemo(() => {
    //   return events.filter((evt) =>
    //     labels
    //       .filter((lbl) => lbl.checked)
    //       .map((lbl) => lbl.label)
    //       .includes(evt.label)
    //   );
    // }, [events, labels]);
  
    // useEffect(() => {
    //   localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    // }, [savedEvents]);
  
    // useEffect(() => {
    //   setLabels((prevLabels) => {
    //     return [...new Set(events.map((evt) => evt.label))].map(
    //       (label) => {
    //         const currentLabel = prevLabels.find(
    //           (lbl) => lbl.label === label
    //         );
    //         return {
    //           label,
    //           checked: currentLabel ? currentLabel.checked : true,
    //         };
    //       }
    //     );
    //   });
    // }, [events]);
  
    // useEffect(() => {
    //   if (smallCalendarMonth !== null) {
    //     setMonthIndex(smallCalendarMonth);
    //   }
    // }, [smallCalendarMonth]);
  
    useEffect(() => {
      if (!showEventModal) {
        setSelectedEvent(null);
      }
    }, [showEventModal]);
  
    function updateLabel(label) {
      setLabels(
        labels.map((lbl) => (lbl.label === label.label ? label : lbl))
      );
    }
  
    return (
      <GlobalContext.Provider
        value={{
          monthIndex,
          setMonthIndex,
          daySelected,
          setDaySelected,
          showEventModal,
          setShowEventModal,
          // dispatchCalEvent,
          selectedEvent,
          setSelectedEvent,
          // savedEvents,
          setLabels,
          labels,
          updateLabel,
          // filteredEvents,
          uid,
          tokenPromise,
          events
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
  }