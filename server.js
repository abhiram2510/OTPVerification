const accountSid = 'ACc2b4d01b31bc78fcf349d0156994eff2';
const authToken = '9c12214c7b7af61ed9cefe47dd867e25';
const twilioNumber = '+1 424 251 5216';

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

function generateOTP() {
  // Logic to generate a random OTP (e.g., using a library like 'crypto-random-string')
  // Return the generated OTP
}

const toPhoneNumber = '+919108023445'; // Replace with the recipient's phone number

const otp = generateOTP();

// Send OTP message
client.messages
  .create({
    body: `Your OTP is: ${otp}`,
    from: twilioNumber,
    to: toPhoneNumber,
  })
  .then((message) => console.log(`OTP sent: ${message.sid}`))
  .catch((error) => console.error(`Error sending OTP: ${error.message}`));
