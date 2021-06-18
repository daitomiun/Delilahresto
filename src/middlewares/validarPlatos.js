function validarDatosplatos(req, res, next){
    const {name, price, img_url, description} = req.body;

    if (!name){
        return res.status(422).json({msg: "Error, no se envio el atributo name"});
    }else{
        if (!price){
            return res.status(422).json({msg: "Error, no se envio el atributo price"});
        }else{
            if (!img_url){
                return res.status(422).json({msg: "Error, no se envio el atributo img_url"});
            }else{
                if (!description){
                    return res.status(422).json({msg: "Error, no se envio el atributo description"});
                }
            }
        }
    }
    next()
};

module.exports = {validarDatosplatos};