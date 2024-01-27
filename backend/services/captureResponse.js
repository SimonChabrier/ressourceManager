const captureResponse = (req, res, next) => {

  console.log('captureResponse');

    const originalJson = res.json;
    console.log('originalJson', originalJson);
    res.json = function (data) {
      res.locals.message = data;
      console.log('res.locals.message', res.locals.message);
      originalJson.call(res, data);
    };

    next();
  };
  
  module.exports = captureResponse;
  