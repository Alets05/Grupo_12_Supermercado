const { validationResult } = require("express-validator");
const {request, response} = require('express')


// next en middleware: Indica que continue con la tarea que sigue al middleware, siempre debe estar.
const validarCampos = (req=request,res=response,next)=>{

    const errors = validationResult(req);

    if ( !errors.isEmpty() ){
        return res.status(404).json(errors);
        
    };
   next();
}
module.exports= {validarCampos};