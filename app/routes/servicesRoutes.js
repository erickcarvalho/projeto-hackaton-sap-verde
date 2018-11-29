module.exports = function(app){

    controller = app.controller.servicesController;

    app.post('/inference_sync', controller.inference_sync);

}