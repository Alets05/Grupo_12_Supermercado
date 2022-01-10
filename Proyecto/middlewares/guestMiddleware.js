const guestMiddleware  =  (req, res, next) => {

    console.log('guest Middleware');
    next();
}



module.exports = {guestMiddleware};