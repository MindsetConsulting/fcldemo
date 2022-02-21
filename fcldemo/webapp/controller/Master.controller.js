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

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oEmployeesTable.getBinding("items"),
				oSorter = new Sorter("FullName", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

		onOpenAddEmployeeDialog: function() {
			if (!this.addEmployeeDialog) {
				this.addEmployeeDialog = this.getView().byId("addEmployeeDialog");
			} 
			this.addEmployeeDialog.open();
		},

		handleDateChange: function (oEvent) {
			var oText = this.byId("textResult"),
				oDP = oEvent.getSource(),
				sValue = oEvent.getParameter("value"),
				bValid = oEvent.getParameter("valid");

			this._iEvent++;
			oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);

			if (bValid) {
				oDP.setValueState(ValueState.None);
			} else {
				oDP.setValueState(ValueState.Error);
			}
		},

		onAddNewEmployee: function () {
			var oModel = this.getView().getModel("employee");
			var EmployeesNumber = oModel.getProperty("/Employees").length;
			var newEmployeeId = EmployeesNumber;
			var newEmployeeFullName = this.getView().byId("FullName").getValue();
			var newEmployeeDepartment = this.getView().byId("Department").getValue();
			var newEmployeeTitle = this.getView().byId("Title").getValue();
			var newEmployeeRole = this.getView().byId("Role").getValue();
			var newEmployeeIndustries = this.getView().byId("Industries").getValue();
			var newEmployeeDirectReport = this.getView().byId("DirectReport").getValue();
			var newEmployeeStartDate = this.getView().byId("StartDate").getValue();
			var newEmployeeEmail = this.getView().byId("Email").getValue();

			var employeeToAdd = {};

			employeeToAdd = {
				"Id": newEmployeeId,
				"FullName": newEmployeeFullName,
				"Department": newEmployeeDepartment,
				"Title": newEmployeeTitle,
				"Role": newEmployeeRole,
				"Industries": newEmployeeIndustries,
				"DirectReport": newEmployeeDirectReport,
				"StartDate": newEmployeeStartDate,
				"Email": newEmployeeEmail,
				"AssignedSkills": []
			};

			var employeeList = oModel.getProperty("/Employees");
			employeeList.push(employeeToAdd);
			oModel.setProperty("/Employees", employeeList);

			this.byId("addEmployeeDialog").close();
		},

		onCancelAddEmployeeDialog: function () {
			this.byId("addEmployeeDialog").close();
		},

        onListItemPress: function (oEvent) {
			var employeePath = oEvent.getSource().getBindingContext("employee").getPath(),
				employee = employeePath.split("/").slice(-1).pop();
			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, employee: employee});
		}
	});
});