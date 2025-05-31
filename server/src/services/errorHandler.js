const errorHandler = async (err, req, res, next) => {
  console.log(err, req.body, res, next);
};

export default errorHandler;
