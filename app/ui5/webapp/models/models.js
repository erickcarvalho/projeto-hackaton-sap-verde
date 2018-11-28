sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";
    return {
        createParameterModel: function () {
            var oModel = new JSONModel();
            oModel.setData({
                "authKey": "",
                "clientId": "",
                "clientSecret": "",
                "saveCookies": false
            });
            oModel.setDefaultBindingMode("TwoWay");
            return oModel;
        },

        createResultModel: function () {
            var oModel = new JSONModel();
            oModel.setData({
                "res": "error"
            });
            oModel.setDefaultBindingMode("TwoWay");
            return oModel;
        }
    };
});