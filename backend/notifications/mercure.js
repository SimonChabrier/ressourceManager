// Used to send notifications to the frontend using mercure
const axios = require('axios');
require('dotenv').config();

const newUserNotification = async (user) => {
    
const payload = {
    '@type': 'User',
    '@id': user['id'],
    username: user['username'],
    email: user['email'],
    firstName: user['firstName'],
    lastName: user['lastName'],
  };

  try {
    const response = await axios.post(
      `${process.env.MERCURE_PUBLIC_URL}`,
      new URLSearchParams({
        topic: 'new_user_registered',
        data: JSON.stringify(payload),
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${process.env.MERCURE_JWT_TOKEN}`,
        },
      }
    );
    console.log("Mercure Success reponse", response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = newUserNotification;
