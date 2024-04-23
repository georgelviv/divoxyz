> [!WARNING]
> In this example, verification is done on the frontend, which is highly not recommended, as the frontend should not know the secret.

TOTP stands for **Time-Based One-Time Password**. It's a type of two-factor authentication that generates a unique, one-time password (**OTP**) based on the current time and a shared secret key. TOTP algorithms typically use a cryptographic hash function to generate the OTP, and the OTP is valid only for a short period of time (usually 30 or 60 seconds).

Users typically generate these passwords using an authenticator app on their smartphone or other devices. TOTP adds an extra layer of security beyond just using a username and password for authentication, as the OTP changes frequently and is valid for a short duration, making it more difficult for attackers to gain unauthorized access.

Usually to add new App to authenticator app, it's asks to scan **QR code**, which mainly contains shared **secret**. QR code encodes URI `otpauth` scheme.

`otpauth://totp` is a URI scheme used for provisioning TOTP (Time-Based One-Time Password) tokens into authenticator apps. When you encounter a URI starting with `otpauth://totp`, it typically contains information required to generate a TOTP token within an authenticator app:

- secret: The secret key shared between the server and the authenticator app, which is used to generate the one-time passwords.
- issuer (optional): The name of the service or organization providing the OTP. It helps users identify which account the token is associated with.
- label (optional): A label identifying the account for which the token is being generated.
- algorithm (optional): The cryptographic algorithm used to generate the OTP (usually HMAC-SHA1, HMAC-SHA256, or HMAC-SHA512).
- digits (optional): The number of digits in the generated OTP (usually 6 or 8).
- period (optional): The length of time (in seconds) for which the OTP is valid.
  When a user scans or manually enters a URI starting with otpauth://totp into their authenticator app, the app uses the provided parameters to generate TOTP tokens that can be used for two-factor authentication.

In this example [totp-generator](https://www.npmjs.com/package/totp-generator) library used for code validation and [qrcode](https://www.npmjs.com/package/qrcode) for generating qr code.
