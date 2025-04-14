import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const trySend = async (to: string, code: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Verify code',
        text: `your code: ${code}`,
    });
};

const codeStore = new Map<string, string>();

export async function sendCode(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ error: 'Email required' });
        return;
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();
    try {
        console.log("trying: email: ", email, "code: ", code);
        await trySend(email, code);
        console.log("success: ", email, code)
        codeStore.set(email, code);
        res.json({ success: true });
    } catch (err) {
        console.error('Mail send error:', err);
        res.status(500).json({ error: 'Failed to send code' });
    }
}

export async function verifyCode(req: Request, res: Response) {
    const { email, code } = req.body;
    const storedCode = codeStore.get(email);

    if (!storedCode) {
        res.status(400).json({ error: 'No code sent to this email' });
        return;
    }

    if (storedCode === code) {
        codeStore.delete(email);
        res.json({ valid: true });
    } else {
        res.status(400).json({ valid: false, error: 'Incorrect code' });
    }
}
