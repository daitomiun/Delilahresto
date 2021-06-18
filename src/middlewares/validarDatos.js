function validarDatosLogin(req, res, next){
    const {mail, password} = req.body;

    if (!mail){
        return res.status(422).json({msg: "Error, no se envio el atributo mail"});
    }else{
        if (!password){
            return res.status(422).json({msg: "Error, no se envio el atributo password"});
        }
    }
    next()
};

function validarDatosRegister(req, res, next){
    const {user_name, password, if_admin, full_name, phone, mail, address} = req.body;

    if (!user_name){
        return res.status(422).json({msg: "Error, no se envio el atributo user_name"});
    }else{
        if (!password){
            return res.status(422).json({msg: "Error, no se envio el atributo password"});
        }else{
            if (!if_admin){
                return res.status(422).json({msg: "Error, no se envio el atributo if_admin"});
            }else{
                if (!full_name){
                    return res.status(422).json({msg: "Error, no se envio el atributo full_name"});
                }else{
                    if (!phone){
                        return res.status(422).json({msg: "Error, no se envio el atributo phone"});
                    }else{
                        if(!mail){
                            return res.status(422).json({msg: "Error, no se envio el atributo mail"});
                        }else{
                            if(!address){
                                return res.status(422).json({msg: "Error, no se envio el atributo address"});
                            }
                        }
                    }
                }
            }
        }
    }
    next()
};

function validarDatosEditar(req, res, next){
    const {user_name, password, if_admin, full_name, phone, mail, address} = req.body;

    if (!user_name){
        return res.status(422).json({msg: "Error, no se envio el atributo user_name"});
    }else{
        if (!password){
            return res.status(422).json({msg: "Error, no se envio el atributo password"});
        }else{
            if (!full_name){
                return res.status(422).json({msg: "Error, no se envio el atributo full_name"});
            }else{
                if (!phone){
                    return res.status(422).json({msg: "Error, no se envio el atributo phone"});
                }else{
                    if(!mail){
                        return res.status(422).json({msg: "Error, no se envio el atributo mail"});
                    }else{
                        if(!address){
                            return res.status(422).json({msg: "Error, no se envio el atributo address"});
                        }
                    }
                }
            }
        }
    }
    next()
};

function validarClave(req, res, next){
    const password = req.body.password;
    if(password.length >= 8){		
        let mayuscula = false;
        let minuscula = false;
        let numero = false;
        let caracter_raro = false;
            
        for(var i = 0;i<password.length;i++){
                
            if(password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90){
                mayuscula = true;
            }
                else if(password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122){
                    minuscula = true;
                }
                else if(password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57){
                    numero = true;
                }
                else{
                    caracter_raro = true;
                }
        }
        if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true){
            next();
        }
    }else{
        res.status(406).json( {msg: "contraseña invalida"} );
        return false;
    }
};
function validarEmail(req, res, next){
    const email = req.body.mail;
    const emailRegex = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!emailRegex.test(email)){
        res.status(406).json({msg: "error email"});
        return false;
    }
    next()
}
module.exports = {validarDatosLogin, validarDatosRegister, validarDatosEditar, validarClave, validarEmail};