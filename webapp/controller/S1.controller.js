sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("ZLE_SOURC_LOGIC.controller.S1", {
		// connect to OData service to retrieve customer parameters (Inventory Visibility, Sutted?, Accept Saturday and Shipping Conditions)
		onLoadParameters: function(oEvent) {
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLE_SOURCING_LOGIC_SRV_SRV/"); // connect to OData service
			var customer = this.getView().byId("smartFilter").getControlByKey("Customer").getValue(); // create new variable and bind to smart filter parameter
			// MessageToast.show(customer); // show message toast
			var oFilters = [ new sap.ui.model.Filter("kunnr", "EQ", customer) ]; // create filter for OData query
			var sStudded = this.getView().byId("smartFilter").getControlByKey("Studded"); // create new variable and bind to smart filter parameter
			var sSaturday = this.getView().byId("smartFilter").getControlByKey("AcceptSaturday"); // create new variable and bind to smart filter parameter
			var sShipping = this.getView().byId("smartFilter").getControlByKey("ShippingMethod"); // create new variable and bind to smart filter parameter
			var sInventory = this.getView().byId("smartFilter").getControlByKey("CustomerCluster"); // create new variable and bind to smart filter parameter
			var sText = this.getView().byId("txtCustomer");
			var sInv =  this.getView().byId("txtInventory");
			sStudded.setValue("");
			sStudded.setSelectedKey("");
			sStudded.setSelectedItemId("");
			sSaturday.setValue("");
			sSaturday.setSelectedKey("");
			sSaturday.setSelectedItemId("");
			sShipping.setValue("");
			sShipping.setSelectedKey("");
			sShipping.setSelectedItemId("");
			sInventory.setValue("");
			sInventory.setSelectedKey("");
			sInventory.setSelectedItemId("");
			sText.setText("");
			sInv.setText("");
			
			oModel.read("/ZI_LE_CUSTOMER_PARAMETERS", { // read OData entity
				filters: oFilters, // using the filter created above
				urlParameters: { "$select": "name1,katr2,katr5,katr7,vsbed" }, // using the following parameters to select
				success:
				function(oData, response) {
					sText.setText(oData.results[0].name1);
					sInv.setText(oData.results[0].katr2);
					// Setting NO as default for studded. Requested by Marc-Olivier on 2021/01/27
					//if (oData.results[0].katr7 == 'X') {
					//	sStudded.setValue(sStudded.mAggregations.picker.mAggregations.content[0].mAggregations.items[1].mProperties.text); //mAggregations.items[1].mProperties.text);
						//sStudded.mProperties.selectedKey = "true";
						//sStudded.mProperties.selectedKey = sStudded.mAggregations.items[1].mProperties.key;
						//sStudded.mProperties.selectedItemId = sStudded.mAggregations.items[1].sId;
					//	sStudded.setSelectedKey(sStudded.mAggregations.picker.mAggregations.content[0].mAggregations.items[1].mProperties.key); //mAggregations.items[1].mProperties.key);
					//	sStudded.setSelectedItemId(sStudded.mAggregations.picker.mAggregations.content[0].mAggregations.items[1].sId); //mAggregations.items[1].sId);
					//} else {
						sStudded.setValue(sStudded.mAggregations.picker.mAggregations.content[0].mAggregations.items[0].mProperties.text); //mAggregations.items[0].mProperties.text);
						//sStudded.mProperties.selectedKey = "false";
						//sStudded.mProperties.selectedKey = sStudded.mAggregations.items[0].mProperties.key;
						//sStudded.mProperties.selectedItemId = sStudded.mAggregations.items[0].sId;
						sStudded.setSelectedKey(sStudded.mAggregations.picker.mAggregations.content[0].mAggregations.items[0].mProperties.key); //mAggregations.items[0].mProperties.key);
						sStudded.setSelectedItemId(sStudded.mAggregations.picker.mAggregations.content[0].mAggregations.items[0].sId); //mAggregations.items[0].sId);
					//}
					if (oData.results[0].katr5 == 'N') {
						sSaturday.setValue(sSaturday.mAggregations.picker.mAggregations.content[0].mAggregations.items[0].mProperties.text); //mAggregations.items[1].mProperties.text);
						//sSaturday.mProperties.selectedKey = "true";
						//sSaturday.mProperties.selectedKey = sSaturday.mAggregations.items[1].mProperties.key;
						//sSaturday.mProperties.selectedItemId = sSaturday.mAggregations.items[1].sId;
						sSaturday.setSelectedKey(sSaturday.mAggregations.picker.mAggregations.content[0].mAggregations.items[0].mProperties.key); //mAggregations.items[1].mProperties.key);
						sSaturday.setSelectedItemId(sSaturday.mAggregations.picker.mAggregations.content[0].mAggregations.items[0].sId); //mAggregations.items[1].sId);
					} 
					if (oData.results[0].katr5 == 'Y') {
						sSaturday.setValue(sSaturday.mAggregations.picker.mAggregations.content[0].mAggregations.items[1].mProperties.text); //mAggregations.items[0].mProperties.text);
						//sSaturday.mProperties.selectedKey = "false";
						//sSaturday.mProperties.selectedKey = sSaturday.mAggregations.items[0].mProperties.key;
						//sSaturday.mProperties.selectedItemId = sSaturday.mAggregations.items[0].sId;
						sSaturday.setSelectedKey(sSaturday.mAggregations.picker.mAggregations.content[0].mAggregations.items[1].mProperties.key); //mAggregations.items[0].mProperties.key);
						sSaturday.setSelectedItemId(sSaturday.mAggregations.picker.mAggregations.content[0].mAggregations.items[1].sId); //mAggregations.items[0].sId);
					}
					var n = sShipping.mAggregations.picker.mAggregations.content[0].mAggregations.items["length"]; //mAggregations.items["length"];
					var i = 0;
					for (i = 0; i < n; i++){
						if (sShipping.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.key == oData.results[0].vsbed){
							sShipping.setValue(sShipping.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.text); //mAggregations.items[i].mProperties.text);
							//sShipping.mProperties.selectedKey = sShipping.mAggregations.items[i].mProperties.key;
							//sShipping.mProperties.selectedItemId = sShipping.mAggregations.items[i].sId;
							sShipping.setSelectedKey(sShipping.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.key); //mAggregations.items[i].mProperties.key);
							sShipping.setSelectedItemId(sShipping.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].sId); //mAggregations.items[i].sId);
						};
					};
					// Setting CSR as default. Requested by Marc-Olivier on 2021/01/26
					n = sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items["length"]; //mAggregations.items["length"];
					i = 0;
					for (i = 0; i < n; i++){
						if (sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.key == 'C'){
							sInventory.setValue(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.text); //mAggregations.items[i].mProperties.text);
							//sInventory.mProperties.selectedKey = sInventory.mAggregations.items[i].mProperties.key;
							//sInventory.mProperties.selectedItemId = sInventory.mAggregations.items[i].sId;
							sInventory.setSelectedKey(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.key); //mAggregations.items[i].mProperties.key);
							sInventory.setSelectedItemId(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].sId); //mAggregations.items[i].sId);
						};
					};
					// Inventory Visivility - getting customer defaults
					/* n = sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items["length"]; //mAggregations.items["length"];
					i = 0;
					for (i = 0; i < n; i++){
						if (sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.key == oData.results[0].katr2){
							sInventory.setValue(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.text); //mAggregations.items[i].mProperties.text);
							//sInventory.mProperties.selectedKey = sInventory.mAggregations.items[i].mProperties.key;
							//sInventory.mProperties.selectedItemId = sInventory.mAggregations.items[i].sId;
							sInventory.setSelectedKey(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.key); //mAggregations.items[i].mProperties.key);
							sInventory.setSelectedItemId(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].sId); //mAggregations.items[i].sId);
						};
					};*/
				}.bind(this),
				 error:
				 function(oError) {
					MessageBox.show("Error loading customer parameters");
				} 
			});
			oModel.read("/Z_TVK2_CDS", {
				success:
				function(oData, response) {
					var n = oData.results["length"];
					var i = 0;
					var text = sInv.getText();
					for (i = 0; i < n; i++){
						if (oData.results[i].InventoryVisibility === text) {
							sInv.setText(oData.results[i].InventoryVisibility_Text + ' (' + oData.results[i].InventoryVisibility + ')' );
						}
					}
				}.bind(this),
				error:
				function(oError) {
					MessageBox.show("Error loading inventory visibility");
				} 
			});
		},
		// smart filter initialization
		onLoadSmartFilter: function(oEvent) {
			// get today's date
			var sDate = this.getView().byId("smartFilter").getControlByKey("RequestDate"); // get the field (FieldName is the name of the field in Metadata)
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance(); //{
				//pattern: "YYYY/MM/dd"}); //"MMM dd, YYYY"}); // set date format
			var date = dateFormat.format( new Date()); // get today's date into a new variable using date format created above
			sDate.setValue(date); // set date into parameter
			//
			// Setting CSR as default. Requested by Marc-Olivier on 2021/01/26
			var sInventory = this.getView().byId("smartFilter").getControlByKey("CustomerCluster"); // create new variable and bind to smart filter parameter
			sInventory.setSelectedKey('C');
			
			var sStudded = this.getView().byId("smartFilter").getControlByKey("Studded"); // create new variable and bind to smart filter parameter
			sStudded.setSelectedKey("false");
			//n = sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items["length"]; //mAggregations.items["length"];
			//i = 0;
			//for (i = 0; i < n; i++){
			//	if (sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.key == 'C'){
			//		sInventory.setValue(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.text); //mAggregations.items[i].mProperties.text);
			//		//sInventory.mProperties.selectedKey = sInventory.mAggregations.items[i].mProperties.key;
			//		//sInventory.mProperties.selectedItemId = sInventory.mAggregations.items[i].sId;
			//		sInventory.setSelectedKey(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].mProperties.key); //mAggregations.items[i].mProperties.key);
			//		sInventory.setSelectedItemId(sInventory.mAggregations.picker.mAggregations.content[0].mAggregations.items[i].sId); //mAggregations.items[i].sId);
			//	};
			//};
		},
		onDataReceived: function(oEvent) {
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLE_SOURCING_LOGIC_SRV_SRV/"); // connect to OData service
			var customer = this.getView().byId("smartFilter").getControlByKey("Customer").getValue(); // create new variable and bind to smart filter parameter
			var sText = this.getView().byId("txtCustomer");
			var sInv =  this.getView().byId("txtInventory");
			var oFilters = [ new sap.ui.model.Filter("kunnr", "EQ", customer) ]; // create filter for OData query
			sText.setText("");
			
			// Get customer name
			oModel.read("/ZI_LE_CUSTOMER_PARAMETERS", { // read OData entity
				filters: oFilters, // using the filter created above
				urlParameters: { "$select": "name1,katr2,katr5,katr7,vsbed" }, // using the following parameters to select
				success:
				function(oData, response) {
					sText.setText(oData.results[0].name1);
					sInv.setText(oData.results[0].katr2);
				}.bind(this),
				error:
				function(oError) {
				   MessageBox.show("Error loading customer parameters");
			   }
			});
			
			oModel.read("/Z_TVK2_CDS", {
				success:
				function(oData, response) {
					var n = oData.results["length"];
					var i = 0;
					var text = sInv.getText();
					for (i = 0; i < n; i++){
						if (oData.results[i].InventoryVisibility === text) {
							sInv.setText(oData.results[i].InventoryVisibility_Text + ' (' + oData.results[i].InventoryVisibility + ')' );
						}
					}
				}.bind(this),
				error:
				function(oError) {
					MessageBox.show("Error loading inventory visibility");
				} 
			});
			
			//validating fields
			var sStudded = this.getView().byId("smartFilter").getControlByKey("Studded"); // create new variable and bind to smart filter parameter
			var sSaturday = this.getView().byId("smartFilter").getControlByKey("AcceptSaturday"); // create new variable and bind to smart filter parameter
			var sShipping = this.getView().byId("smartFilter").getControlByKey("ShippingMethod"); // create new variable and bind to smart filter parameter
			var sInventory = this.getView().byId("smartFilter").getControlByKey("CustomerCluster"); // create new variable and bind to smart filter parameter
			
			if (sStudded.getValue() === "" || sSaturday.getValue() === "" || sShipping.getValue() === "" || sInventory.getValue() === ""){
				MessageBox.show("Please enter all parameters");
			}
		}
	});
});