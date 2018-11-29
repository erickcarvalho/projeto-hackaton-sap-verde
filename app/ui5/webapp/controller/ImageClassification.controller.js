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
		},

		_setupModel: function (oView) {
			var m = {};
			m.results = [];
			for (var i = 0; i < 5; i++) {
				m.results[i] = {};
				m.results[i].score = [""];
				m.results[i].label = [""];
			}

			oView.setModel(new sap.ui.model.json.JSONModel(m));
		},

		
		handleValueChange: function(oEvent) {
			var oBusyIndicator = new sap.m.BusyDialog();
			oBusyIndicator.open();

			var oView = this.getView();

			var reader = new FileReader();
			
			if(oEvent.getParameters().files[0] !== undefined) {
				reader.readAsDataURL(oEvent.getParameters().files[0]);			
				this._generateRequest(1, oView, oBusyIndicator);
			
			} else {
				oBusyIndicator.close();
			}
		},

		
		_generateRequest: function (i, oView, oBusyIndicator) {
			
			let headers = {
				"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vbWwtdHJhaW4tdXMtMTE1LmF1dGhlbnRpY2F0aW9uLnVzMTAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImtleS1pZC0xIiwidHlwIjoiSldUIn0.eyJqdGkiOiJhYWRhOGE4MGEzNWU0NzQ5ODA1MWY3MDIxZTUxM2E0ZiIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJ6ZG4iOiJtbC10cmFpbi11cy0xMTUiLCJzZXJ2aWNlaW5zdGFuY2VpZCI6ImU5OTE1YTIyLWFiY2UtNGYzMy1iMWU4LWNjNjQ3MzlkZGJhNiJ9LCJzdWIiOiJzYi1lOTkxNWEyMi1hYmNlLTRmMzMtYjFlOC1jYzY0NzM5ZGRiYTYhYjEwNTZ8Zm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0IiwiYXV0aG9yaXRpZXMiOlsiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0Lm1vZGVsc2VydmljZS5yZWFkIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0LnJldHJhaW5zZXJ2aWNlLndyaXRlIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0Lm1vZGVsbWV0ZXJpbmcucmVhZCIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5zdG9yYWdlYXBpLmFsbCIsInVhYS5yZXNvdXJjZSIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5kYXRhbWFuYWdlbWVudC5yZWFkIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0Lm1vZGVscmVwby53cml0ZSIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5kYXRhbWFuYWdlbWVudC53cml0ZSIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5tb2RlbGRlcGxveW1lbnQuYWxsIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0Lm1vZGVscmVwby5yZWFkIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0LnJldHJhaW5zZXJ2aWNlLnJlYWQiLCJmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQuZnVuY3Rpb25hbHNlcnZpY2UuYWxsIl0sInNjb3BlIjpbImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5tb2RlbHNlcnZpY2UucmVhZCIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5yZXRyYWluc2VydmljZS53cml0ZSIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5tb2RlbG1ldGVyaW5nLnJlYWQiLCJmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQuc3RvcmFnZWFwaS5hbGwiLCJ1YWEucmVzb3VyY2UiLCJmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQuZGF0YW1hbmFnZW1lbnQucmVhZCIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5tb2RlbHJlcG8ud3JpdGUiLCJmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQuZGF0YW1hbmFnZW1lbnQud3JpdGUiLCJmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQubW9kZWxkZXBsb3ltZW50LmFsbCIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5tb2RlbHJlcG8ucmVhZCIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5yZXRyYWluc2VydmljZS5yZWFkIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0LmZ1bmN0aW9uYWxzZXJ2aWNlLmFsbCJdLCJjbGllbnRfaWQiOiJzYi1lOTkxNWEyMi1hYmNlLTRmMzMtYjFlOC1jYzY0NzM5ZGRiYTYhYjEwNTZ8Zm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0IiwiY2lkIjoic2ItZTk5MTVhMjItYWJjZS00ZjMzLWIxZTgtY2M2NDczOWRkYmE2IWIxMDU2fGZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NCIsImF6cCI6InNiLWU5OTE1YTIyLWFiY2UtNGYzMy1iMWU4LWNjNjQ3MzlkZGJhNiFiMTA1Nnxmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjFjNmE2MzEwIiwiaWF0IjoxNTQzNDkwOTkyLCJleHAiOjE1NDM1MzQxOTIsImlzcyI6Imh0dHA6Ly9tbC10cmFpbi11cy0xMTUubG9jYWxob3N0OjgwODAvdWFhL29hdXRoL3Rva2VuIiwiemlkIjoiYjBiMzMxZjYtMWZmYS00N2Y5LTkxYTktNTAzYjRjOTg4NzhlIiwiYXVkIjpbImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5tb2RlbG1ldGVyaW5nIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0LnN0b3JhZ2VhcGkiLCJmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQubW9kZWxzZXJ2aWNlIiwidWFhIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0LmRhdGFtYW5hZ2VtZW50Iiwic2ItZTk5MTVhMjItYWJjZS00ZjMzLWIxZTgtY2M2NDczOWRkYmE2IWIxMDU2fGZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NCIsImZvdW5kYXRpb24tc3RkLW1sZnByZXByb2R1Y3Rpb24hYjE2NC5tb2RlbGRlcGxveW1lbnQiLCJmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQucmV0cmFpbnNlcnZpY2UiLCJmb3VuZGF0aW9uLXN0ZC1tbGZwcmVwcm9kdWN0aW9uIWIxNjQubW9kZWxyZXBvIiwiZm91bmRhdGlvbi1zdGQtbWxmcHJlcHJvZHVjdGlvbiFiMTY0LmZ1bmN0aW9uYWxzZXJ2aWNlIl19.i3wuwyxKU4Ue5i4SNwz-BwGYy8MnNvujJ25O_OpgiMruUjr96hIth1MydHZBzMo0mSqO-JfPNm1AP_YaJIzEYMBYeaEiWGj5qI124dWIDjbKsvceF-_k9IuEyySI6Ucmpr2Pu1IWDQHbFtltGE_m9GVX9MqmBDpkvUUNLGnJDiejwuyEVGXHnqKD5Bi9rpupAdVOPlce8DhcI4aKIlGVBoN_fYu5ycu8gYe9LXHKuiiFvxQk2m-5uk9TjBrLNYUw7saljN-1gm-00YNDOjmWShstaQFpTBI50wzy8G1EZuF1t7gk1Cxz_3WDZzuzRtkrBOS6go_Wm0b7Q2caFrxd5dAGXq0G2wgYcXgVJXhUzfVPeIq6-3jpZfhSVZPq1ctNf2tMbFmQ1pQRCdioBPQfD_16-M1qbDF1eXcltdedByTSpaf0A6tfImui7fAe4JeGg8-pc9MzBa81C5aPgrK6odYq9idIHh2hyiQBMY0zUi3mPKzEg4ly9207sHpP5B4ZaGxFasWDBFWLOvnt8WlJLszUitXKy8pBQNCxm9QkqW-EN1l5zYhr00vqr0lhai5VVT4UFtqVWpi2zVHCrvMOJ4THerKHYnaU2aRwgSkeGmersGyKlZOk8SgAJwtQggq6oTWhjYtBB8X4SG9oWCJXyNyh3otMLXlL21YnOTnbYNM"
			}
			
			var that = this;
			var data = new FormData();
			data.append("files", oView.byId("fileUploader").oFileUpload.files[0]);
			$.ajax({
				"async": true,
				"url": "https://mlfproduction-image-classifier.cfapps.us10.hana.ondemand.com/api/v2/image/classification/models/modelShop/versions/1",
				"method": "POST",
				"headers": headers,
				"processData": false,
				"contentType": false,
				"mimeType": "multipart/form-data",
				"data": data
			}).done(function (res) {
				
				try {
					var resp = $.parseJSON(res);
				}
				catch(err){
					console.log("error");
				}

				var element ;
				if (JSON.stringify(resp.predictions[0].results[0].label) == "VinhoBranco") element = "White Wine"
				else if (JSON.stringify(resp.predictions[0].results[0].label) == "VinhoTinto") element = "Red Wine"
				else element = JSON.stringify(resp.predictions[0].results[0].label);

				let data2 = { "messages": [{ "type": "text", "content": element }] };
				
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://api.recast.ai/connect/v1/conversations/97ec5309-338c-4ce8-8e19-10ae84d68ef8/messages",
					"method": "POST",
					"headers": {
						"Content-Type": "application/json",
						"Authorization": "Token 727617ff1da5c2ede8d3dc15dc0130ce"
					},
					"processData": false,
					"data": JSON.stringify(data2)
				}

				// "{\"messages\":[{\"type\":\"text\",\"content\":\"Heineken\"}]}"
				$.ajax(settings).done(function (response) {
					console.log(response);
					oBusyIndicator.close();
				});


				// try {
				// 	let response = $.parseJSON(res);
					
				// 	let headers2 = {
				// 		"Authorization": 'Token 727617ff1da5c2ede8d3dc15dc0130ce'
				// 	}
					
				// 	let data2 = ({ 'messages': [{ type: 'text', content: response.predictions[0].results[0].label }] });

				// 	$.ajax({
				// 		"async": true,
				// 		"url": "https://api.recast.ai/connect/v1/conversations/b9cd14b7-9c37-4f43-8266-5010bc633e6b/messages",
				// 		"method": "POST",
				// 		"headers": headers2,
				// 		"processData": false,
				// 		"Content-Type": "application/json",
				// 		"data": JSON.stringify(data2)
				// 	}).done(function(res){
				// 		try {
				// 			console.log("Sucesso - Mensagem enviada para o bot" + res);
				// 		} catch (err) {
				// 			oBusyIndicator.close();
				// 			that.displayErrorBox("Caught error: " + err.message);
				// 		}
				// 		}).fail(function (err){
				// 			oBusyIndicator.close();
				// 			console.log(err);
				// 		});
				// 	}
				// catch (err) {
				// 	oBusyIndicator.close();
				// 	that.displayErrorBox("Caught error: " + err.message);
				// }
			}).fail(function (jqXHR, textStatus) {
				oBusyIndicator.close();
				that.displayErrorBox("Caught error: " + jqXHR.statusText + "\n\n Info: " + response.error.message);
			});
		}
	});
});