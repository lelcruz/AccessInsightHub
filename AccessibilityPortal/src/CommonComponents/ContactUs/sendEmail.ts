"use server";

import {Resend} from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
    const message = formData.get('message');
    const email = formData.get('email');

    //Handle empty message
    if(!message || typeof message !== "string") {
        return {
            error: "Invalid message"
        };
    }

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "capstonead1@gmail.com",
        subject: "Message from contact form",
        text: message as string,
    });

   
};