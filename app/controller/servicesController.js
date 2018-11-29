module.exports = function(app){

    var servicesController = {

        inference_sync: function(req, res){
            
            try {
                // Implementação do código de consumo da API
                let err;
                if (err) throw exception;
                res.format({
                    json: function () {
                        res.status(200).json("RESULTADO DA IMPLEMENTAÇÃO");
                    }
                })
            }
            catch (exception) {
                res.status(500).json(err);
            }
        }
    }

    return servicesController;
}