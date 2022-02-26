
const validateImage  = (req, res, next) => {

    // console.log('gest middleware: ' + req.session.userLogged);
    if (typeof req.files['imagenPerfil'] == "undefined"){
        throw new Error (`imagenPerfil es obligatorio`)
        }


    filename = req.files['imagenPerfil'];
    var extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                // return '.jpg';
                pass
            case '.jpeg':
                // return '.jpeg';
                pass
            case  '.png':
                // return '.png';
                pass
            case  '.gif':
                // return '.png';
                pass
            default:
                throw new Error (`imagenPerfil solo admite formato jpg, png y jpeg`);
        }

    next();
}



module.exports= {validateImage};