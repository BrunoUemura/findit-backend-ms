# Node.js Email Sender

A simple email sender API built in Node.js

## Setup

- Install the dependencies using the command `npm install`
- Create a `.env` file in project root and add the following information.

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

- Start the project using the command `npm start`

## Usage

Send a POST request to `http://localhost:4001/send-email` passing the body below:

```json
{
  "destination": "destination_example@gmail.com",
  "subject": "The Subject You Want",
  "text": "Email Text",
  "html": "<h1>Hi!</h1> You can send HTML if you want"
}
```

## Author

- Bruno Hideki Uemura [linkedin](https://www.linkedin.com/in/bruno-hideki-uemura-918589139/), [Github](https://github.com/BrunoUemura)
