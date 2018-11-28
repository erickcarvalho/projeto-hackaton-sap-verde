sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/suite/ui/microchart/RadialMicroChart"
], function(Controller) {
	"use strict";
	return Controller.extend("sap.mlf.timeverde.controller.ImageClassification", {
	
		onInit: function () {
			sap.ui.getCore().attachValidationError(function (evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("Error");
				}
			});

			sap.ui.getCore().attachValidationSuccess(function (evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("None");
				}
			});

			this.getView().byId("fileUploader").addStyleClass("fileUploaderStyle1");
		}
	});
});