import axios from 'axios';

const url = "https://nus-assist.herokuapp.com/api/tasks";

// Add task
export const addToDB = async (name, desc, deadline, uid, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);
    let payload;
    if (deadline == null) {
        payload = {
            "task": name,
            "desc": desc,
            "uid": uid,
            "date": new Date(),
            "deadline": null,
        }
    } else {
        payload = {
                "task": name,
                "desc": desc,
                "uid": uid,
                "date": new Date(),
                "deadline": new Date(deadline),
        }
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

// Get tasks
export const getTaskEntries = async (uid, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);

    try {
        const res = await axios.get(url, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

// Delete tasks
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

// Edit task
export const editTask = async (uid, id, name, desc, completed, date, deadline, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);

    try {
        let payload;
        if (deadline == null) {
            payload = {
                "task": name,
                "desc": desc,
                "completed": completed,
                "date": new Date(date),
                "deadline": null
            }
        } else {
            payload = {
                    "task": name,
                    "desc": desc,
                    "completed": completed,
                    "date": new Date(date),
                    "deadline": new Date(deadline)
            }
        }
        
        const taskUrl = url + `/${id}`;

        const res = await axios.put(taskUrl, payload, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}