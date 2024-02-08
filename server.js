const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const session = require('express-session');

const app = express();
const port = 3000;

// Twilio credentials (replace with your actual values)
const accountSid = 'ACc2b4d01b31bc78fcf349d0156994eff2';
const authToken = '9c12214c7b7af61ed9cefe47dd867e25';
const twilioPhoneNumber = '+14242515216';

const client = new twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));

// Configure session
app.use(session({
    secret: 'Abdcdfjeofjwirgjiwrgjewrpogjerogjerog',
    resave: false,
    saveUninitialized: true
}));

app.post('/send-otp', (req, res) => {
    const countryCode = req.body.countryCode;
    const phoneNumber = req.body.phoneNumber;

    if (countryCode && phoneNumber) {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Replace with your actual Twilio phone number
        const from = `+${twilioPhoneNumber}`;

        // Replace with the user's phone number
        const to = `+${countryCode}${phoneNumber}`;

        // Store OTP, phone number, and timestamp in the session
        req.session.otpData = {
            otp,
            phoneNumber,
            timestamp: Date.now()
        };

        // Send OTP using Twilio
        client.messages.create({
            body: `Your OTP: ${otp}`,
            from,
            to
        })
        .then(() => {
            res.send('OTP sent successfully!');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Failed to send OTP.');
        });
    } else {
        res.status(400).send('Invalid request. Please provide both country code and phone number.');
    }
});

app.post('/verify-otp', (req, res) => {
    const enteredOTP = req.body.otp;
    const storedOTPData = req.session.otpData;

    if (enteredOTP && storedOTPData) {
        const { otp, phoneNumber, timestamp } = storedOTPData;

        // Check if the OTP is valid
        if (enteredOTP === otp) {
            const currentTime = Date.now();
            const timeDifference = currentTime - timestamp;
            const timeDifferenceInMinutes = timeDifference / (1000 * 60);

            if (timeDifferenceInMinutes <= 10) {
                res.send('OTP verified successfully!');
            } else {
                res.status(400).send('OTP has expired. Please request a new OTP.');
            }
        } else {
            // Invalid OTP
            res.status(400).send('Invalid OTP. Please try again.');
        }
    } else {
        // OTP data not found
        res.status(400).send('OTP data not found. Please request a new OTP.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
