const isUserLoggedMiddleware  =  (req, res, next) => {
    res.locals.isLogged = false;

    // console.log('Cookies :  ' + req.cookies);

    if (req.cookies){

    let emailCookie = req.cookies.userEmail;
    console.log('emailCookie:' + emailCookie);
    const usuarios = require ('../data/users.json');
    const  userFromCookie =  usuarios.find (user => user.email === emailCookie);

    if (userFromCookie) {
        let userAux = {};
        Object.assign (userAux, userFromCookie);
        userAux.password='';
        req.session.userLogged= userAux;
        console.log('User Cookie:' + req.session.userLogged);
    }

    }

    if(req.session.userLogged) {
        console.log('User Session' + req.session.userLogged);
        res.locals.isLogged =true;
    };
    next();
}



module.exports = {isUserLoggedMiddleware};