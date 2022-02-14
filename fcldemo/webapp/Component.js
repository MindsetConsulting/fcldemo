sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "fcldemo/fcldemo/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("fcldemo.fcldemo.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                var oProductsModel;
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // set products demo model on this sample
                oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui/demo/mock') + '/products.json');
                oProductsModel.setSizeLimit(1000);
                this.setModel(oProductsModel, 'products');

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);