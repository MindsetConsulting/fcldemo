sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
    "sap/f/library",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType"
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary, Dialog, DialogType, Button, ButtonType) {
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
			// Get the Model in the view
			var oModel = this.getView().getModel("employee");
			// Get the Number of records in the OData Employees
			var EmployeesNumber = oModel.getProperty("/Employees").length;
			// Populate the new Employee ID
			var NewEmployeeID = EmployeesNumber + 1;
			// Display a popup to Insert the new Employee First Name and Employee Last Name
			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Add Employee",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [new sap.ui.layout.VerticalLayout({
						width: "150px",
						content: [
							new sap.m.Label({
								text: "Id"
							}),
							new sap.m.Input("Id", {
								value: NewEmployeeID,
								editable: false
							}),
							new sap.m.Label({
								text: "Full Name"
							}),
							new sap.m.Input("FullName"),
							new sap.m.Label({
								text: "Department"
							}),
							new sap.m.Input("Department"),
							new sap.m.Label({
								text: "Title"
							}),
							new sap.m.Input("Title"),
							new sap.m.Label({
								text: "Role"
							}),
							new sap.m.Input("Role"),
							new sap.m.Label({
								text: "Industries"
							}),
							new sap.m.Input("Industries"),
							new sap.m.Label({
								text: "Direct Report"
							}),
							new sap.m.Input("DirectReport"),
							new sap.m.Label({
								text: "Start Date"
							}),
							new sap.m.Input("StartDate"),
							new sap.m.Label({
								text: "Email"
							}),
							new sap.m.Input("Email")
						]
					})]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function() {
						// Read the new Employee values
						var NewEmployeeID = sap.ui.getCore().byId("Id").getValue();
						var NewEmployeeFullName = sap.ui.getCore().byId("FullName").getValue();
						var NewEmployeeDepartment = sap.ui.getCore().byId("Department").getValue();
						var NewEmployeeTitle = sap.ui.getCore().byId("Title").getValue();
						var NewEmployeeRole = sap.ui.getCore().byId("Role").getValue();
						var NewEmployeeIndustries = sap.ui.getCore().byId("Industries").getValue();
						var NewEmployeeDirectReport = sap.ui.getCore().byId("DirectReport").getValue();
						var NewEmployeeStartDate = sap.ui.getCore().byId("StartDate").getValue();
						var NewEmployeeEmail = sap.ui.getCore().byId("Email").getValue();
						// Create Object
						var oEmployee = {};
						oEmployee = {
							"dD": NewEmployeeID,
							"FullName": NewEmployeeFullName,
							"Department": NewEmployeeDepartment,
							"Title": NewEmployeeTitle,
							"Role": NewEmployeeRole,
							"Industries": NewEmployeeIndustries,
							"DirectReport": NewEmployeeDirectReport,
							"StartDate": NewEmployeeStartDate,
							"Email": NewEmployeeEmail
						};
						//Get the OData 
						var oEmployees = oModel.getProperty("/Employees");
						// Add the new record to the Odata
						oEmployees.push(oEmployee);
						oModel.setProperty("/Employees", oEmployees);
						// Close the popup
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();

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