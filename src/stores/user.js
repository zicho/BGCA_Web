import { get, writable } from 'svelte/store';
import * as signalR from "@microsoft/signalr";
import * as Toastr from "toastr";

export const isAuthed = writable(false);
export const user = writable(null);

export const notificationCount = writable(0);
export const messageCount = writable(0);

export const messages = writable([]);

let signalRconnection;

export const syncMessageCount = async () => {
    const response = await fetch(
        `https://localhost:44361/api/message/${get(user).username}/unread/count`,
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

    messageCount.set(result.data)
}

export const getLatestUnreadMessages = async () => {
    const response = await fetch(
        `https://localhost:44361/api/message/${get(user).username}/unread/5`,
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

    messages.set(result.data);
}

export const clearMessages = async () => {
    const response = await fetch(
        `https://localhost:44361/api/message/${get(user).username}/unread/clear/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${get(user).jwt}`,
            },
        }
    );

    messageCount.set(0)
}

export const logout = async () => {

    isAuthed.set(false);
    user.set(null);
    
    await signalRconnection.stop();
    Toastr.clear()
    
}

export const login = async (username, password, register = false) => {
    const response = await fetch(
        `https://localhost:44361/api/user/${register ? "register" : "login"}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
    // .catch(() => displayError("Could not reach server"))
    // .finally(() => {
    //     loading = false;
    // });

    var result = await response.json();

    if (result.success && !register) {
        connect(result.data.jwt);
        isAuthed.set(true);
        user.set(result.data);
        syncMessageCount();
    }

    return result;
}

async function connect(token) {
    signalRconnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:44361/notifications", {
            accessTokenFactory: () => token,
        })
        .build();

    signalRconnection.on("SendNotice", (content) => {
        Toastr.success(content);
    });

    signalRconnection.on("SendPrivateMessage", async (subject, content) => {
        Toastr.success(content, subject);
        syncMessageCount();
    });

    signalRconnection
        .start()
        .finally(() =>
            console.log(
                signalRconnection.state == signalR.HubConnectionState.Connected
            )
        );
}

