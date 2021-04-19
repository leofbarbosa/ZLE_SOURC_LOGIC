jQuery.sap.declare("ZLE_SOURC_LOGIC.Component");
sap.ui.getCore().loadLibrary("sap.ui.generic.app");
jQuery.sap.require("sap.ui.generic.app.AppComponent");

sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ZLE_SOURC_LOGIC/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ZLE_SOURC_LOGIC.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});