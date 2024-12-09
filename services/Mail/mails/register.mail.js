import { envService } from "../../Env/envService.js";

export const registerMail = (email, name, token) => {
    const { BASE_URL, ONLINE_BASE_URL, ENVIRONMENT } = envService;
    const url = ENVIRONMENT === "development" ? BASE_URL : ONLINE_BASE_URL;

    return {
        to: email,
        subject: "הרשמה ל-Bcard API",
        html: `
            <p>שלום ${name},</p>
            <p>תודה שנרשמת ל-Bcard API!</p>
            <p>אנא לחץ על הקישור הבא כדי לאשר את ההרשמה שלך:</p>
            <form action="${url}/users/verify/${email}/${token}" 
                method="POST" 
                style="display:inline;" 
                onsubmit="event.preventDefault(); fetch(this.action, { method: 'POST' });"
            >
                <button type="submit">לחץ כאן לאישור הרשמה</button>
            </form>`
    };
};
