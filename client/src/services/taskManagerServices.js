import axios from 'axios';

const url = "http://localhost:5000/api/tasks";

// Add task
export const addToDB = async (name, desc, uid) => {
    const header = await createReqHeader(uid);
    
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

const createReqHeader = async (uid) => {
    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            'uid': uid,
        },
    };
    
    return payloadHeader;
}

// Get tasks
export const getTaskEntries = async (uid) => {
    const header = await createReqHeader(uid);

    try {
        const res = await axios.get(url, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

// Delete tasks
export const deleteFromDB = async (id) => {
    try {
        const deleteUrl = url + `/${id}`;
        const res = await axios.delete(deleteUrl);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

// Edit task
export const editTask = async (id, name, desc) => {
    try {
        const payload = {
            "task": name,
            "desc": desc,
        }
        const taskUrl = url + `/${id}`;

        const res = await axios.put(taskUrl, payload);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}