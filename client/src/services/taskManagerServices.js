import axios from 'axios';

const url = "http://localhost:5000/api/tasks";

// Add task
export const addToDB = async (name, desc, uid, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);
    
    const payload = {
        "task": name,
        "desc": desc,
        "uid": uid,
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
export const editTask = async (uid, id, name, desc, tokenPromise) => {
    const header = await createReqHeader(uid, tokenPromise);

    try {
        const payload = {
            "task": name,
            "desc": desc,
        }
        const taskUrl = url + `/${id}`;

        const res = await axios.put(taskUrl, payload, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}