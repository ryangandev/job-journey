import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    await resend.emails
        .send({
            from: "Job Journey Email Verification<onboarding@resend.dev>",
            to: email,
            subject: "Verify your email",
            html: `<p>Thanks for using Job Journey. Please use this <a href="${confirmLink}">link</a> to verify your email.</p>`,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
};

export { sendVerificationEmail };
