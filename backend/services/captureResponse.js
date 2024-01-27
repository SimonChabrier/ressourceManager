// on injecte ce middle dans les routes pour capturer les reponses des controllers
// et les injecter dans res.locals.message pour les logger dans le middleware loggerFileWriter

const captureResponse = (req, res, next) => {

    const originalJson = res.json;

    res.json = function (data) {
      res.locals.message = data;
      originalJson.call(res, data);
    };

    next();
  };
  
  module.exports = captureResponse;
  