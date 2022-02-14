sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "fcldemo/fcldemo/model/models",
        "sap/ui/model/json/JSONModel",
        "sap/f/library"
    ],
    function (UIComponent, Device, models, JSONModel, fioriLibrary) {
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
                var oModel,
                    oProductsModel,
                    oRouter;

                UIComponent.prototype.init.apply(this, arguments);

                oModel = new JSONModel();
                this.setModel(oModel);

                // set products demo model on this sample
                oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui/demo/mock') + '/products.json');
                oProductsModel.setSizeLimit(1000);
                this.setModel(oProductsModel, 'products');

                oRouter = this.getRouter();
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                oRouter.initialize();
            },

            _onBeforeRouteMatched: function(oEvent) {
                var oModel = this.getModel(),
                    sLayout = oEvent.getParameters().arguments.layout;
    
                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    sLayout = fioriLibrary.LayoutType.OneColumn;
                }          
            }
        });
    }
);