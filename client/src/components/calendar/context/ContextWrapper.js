import React, {
    useState,
    useEffect,
    useMemo,
  } from "react";
  import GlobalContext from "./GlobalContext";
  import dayjs from "dayjs";
  import { useAuth } from "../../../hooks/useAuth";
  import { getEvents } from "../../../services/calendarServices";
  
  export default function ContextWrapper(props) {
    const [ events, setEvents ] = useState([]);
    const { user } = useAuth();
    const uid = user.uid;
    const tokenPromise = user.getIdToken();
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
  
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
  
    useEffect(() => {
      setLabels((prevLabels) => {
        return [...new Set(events.map((evt) => evt.label))].map(
          (label) => {
            const currentLabel = prevLabels.find(
              (lbl) => lbl.label === label
            );
            return {
              label,
              checked: currentLabel ? currentLabel.checked : true,
            };
          }
        );
      });
    }, [events]);
  
    useEffect(() => {
      if (!showEventModal) {
        setSelectedEvent(null);
      }
    }, [showEventModal]);
  
    // function updateLabel(label) {
    //   setLabels(
    //     labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    //   );
    // }
  
    return (
      <GlobalContext.Provider
        value={{
          monthIndex,
          setMonthIndex,
          daySelected,
          setDaySelected,
          showEventModal,
          setShowEventModal,
          selectedEvent,
          setSelectedEvent,
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