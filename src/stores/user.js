import { get, writable } from 'svelte/store';

export const isAuthed = writable(false);

export const user = writable(null);



export const notifications = writable(0);
export const messages = writable(0);

export const syncMessages = async () => {
    const response = await fetch(
        `https://localhost:44361/api/message/${get(user).username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${get(user).jwt}`,
            },
        }
    );
    
    const result = await response.json();

    console.dir(messages.set(result.data))  
}

export const clearMessages = async () => {
    const response = await fetch(
        `https://localhost:44361/api/message/clear/${get(user).username}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${get(user).jwt}`,
            },
        }
    );
    
    console.dir(messages.set(0))
}

export const logout = () => {
    isAuthed.set(false);
    user.set(null)

}

