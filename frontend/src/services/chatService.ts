import { CHAT_API } from "../api/apiEndpoints";
import type { ChatRequest } from "../types/chat";

export const streamChat = async (
    request: ChatRequest,
    onToken: (token: string) => void,
    onDone: (sessionId: string) => void,
    onError: (message: string) => void,
) => {

    const token = localStorage.getItem("token")
    // console.log("Streaming started");

    const response = await fetch(`${import.meta.env.VITE_API_URL}${CHAT_API.CHAT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
    });


    if (!response.ok || !response.body) {
        throw new Error("Unable to connect.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
        const { value, done } = await reader.read();
        // console.log("READ", done, value);

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const sseEvents = buffer.split("\n\n");
        buffer = sseEvents.pop() ?? "";

        // console.log(event);
        // console.log(lines);

        for (const event of sseEvents) {
            const lines = event.split("\n");

            const eventName = lines
                .find((l) => l.startsWith("event:"))
                ?.replace("event:", "")
                .trim();

            const data = lines
                .find((l) => l.startsWith("data:"))
                ?.replace("data:", "")
                .trim();

            if (!eventName || !data) continue;

            const json = JSON.parse(data);

            switch (eventName) {
                case "token":
                    onToken(json.content);
                    break;

                case "done":
                    onDone(json.session_id);
                    // console.log(json.session_id)
                    break;

                case "error":
                    onError(json.message);
                    break;
            }
        }
    }
};
