const axios = require('axios');
const qs = require('qs');
const logger = require('../utils/logger')('LineNotify');
const { ValidationError} = require('../errors');

exports.lineNotify = async ({ message = '', token, url }) => {
  try {
    if(!token || !url) {
      logger.error(`Failed to find token and lineNotifyUrl: not found`, {  message, token, url });
      throw new ValidationError('Invalid token')
    }

    const data = qs.stringify({ message });

    const config = {
      method: 'POST',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    await axios(config);
    logger.info(`Successfully send message to line notify message=${message}`, { message })

  } catch (error) {
    logger.error(`Oops! something went wrong. error: ${error.stack}`, error.stack);
  }
};
