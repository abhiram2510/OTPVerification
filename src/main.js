function sendOTP() {
    const countryCode = document.getElementById('countryCode').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    fetch('/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            countryCode,
            phoneNumber,
        }),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        // Show the OTP verification section
        document.getElementById('verifySection').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}

function verifyOTP() {
    const userEnteredOtp = document.getElementById('userEnteredOtp').value;

    fetch('/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userEnteredOtp,
        }),
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
