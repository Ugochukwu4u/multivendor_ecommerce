import axios  from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWQ3Yzk3YmQxYjYzZWMyOTQ0ZDdlOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMTQ0MjgyNywiZXhwIjoxNzE0MDM0ODI3fQ.9A8Bcd7oNahAOxILopa06uw95uvTffuhGD7q7oVFzkM"

export const publicRequest = axios.create({
    baseURL:BASE_URL,
});
export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
});

