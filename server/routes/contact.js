const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
require('dotenv').config();
const { validationResult } = require('express-validator');
const { validateMessage } = require('./validators/message');

router.post('/', validateMessage, async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are errors, send them back as a response
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = oauth2Client.getAccessToken();
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MY_EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.MY_EMAIL,
        subject: `Message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

module.exports = router;