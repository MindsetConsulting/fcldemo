sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
    "sap/f/library"
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";

	return Controller.extend("fcldemo.fcldemo.controller.Master", {
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oEmployeesTable = this.oView.byId("employeesTable");
			this.oRouter = this.getOwnerComponent().getRouter();
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("FullName", FilterOperator.Contains, sQuery)];
			}

			this.oEmployeesTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function () {
			MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oEmployeesTable.getBinding("items"),
				oSorter = new Sorter("FullName", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

        onListItemPress: function (oEvent) {
			var employeePath = oEvent.getSource().getBindingContext("employee").getPath(),
				employee = employeePath.split("/").slice(-1).pop();
			console.log("clicked");
			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, employee: employee});
		}
	});
});