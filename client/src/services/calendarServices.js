import axios from 'axios';

const url = "http://localhost:5000/api/events";

// Add event
export const addToDB = async (title, desc, day, id, uid, label, startTime, endTime, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);
    const payload = {
        "title": title,
        "desc": desc,
        "day": day,
        "id": id,
        "uid": uid,
        "label": label,
        "startTime": startTime,
        "endTime": endTime
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data
    } catch(e) {
        console.error(e);
    }
};

const createReqHeader = async (uid, tokenPromise) => {
    const token = await tokenPromise;
    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            'uid': uid,
            Authorisation: `Bearer ${token}`,
        },
    };
    
    return payloadHeader;
}

// Get events
export const getEvents = async (uid, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);

    try {
        const res = await axios.get(url, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

// Delete event
export const deleteFromDB = async (uid, id, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);
    
    try {
        const deleteUrl = url + `/${id}`;
        const res = await axios.delete(deleteUrl, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

// Edit event
export const editEvent = async (title, desc, day, id, uid, label, startTime, endTime, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);

    try {
        const payload = {
            "title": title,
            "desc": desc,
            "day": day,
            "id": id,
            "uid": uid,
            "label": label,
            "startTime": startTime,
            "endTime": endTime
        }
        const eventUrl = url + `/${id}`;

        const res = await axios.put(eventUrl, payload, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}