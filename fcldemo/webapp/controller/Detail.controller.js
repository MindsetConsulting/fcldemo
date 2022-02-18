sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/f/library",
	"sap/ui/core/Fragment"
], function (Controller, MessageBox, fioriLibrary, Fragment) {
	"use strict";

	return Controller.extend("fcldemo.fcldemo.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onEmployeeMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onEmployeeMatched, this);
			this.oRouter.getRoute("detailSkill").attachPatternMatched(this._onEmployeeMatched, this);
		},

		onSkillPress: function (oEvent) {
			var skillPath = oEvent.getSource().getBindingContext("employee").getPath(),
				skill = skillPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detailSkill", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, skill: skill, employee: this._employee});
		},

		_onEmployeeMatched: function (oEvent) {
			this._employee = oEvent.getParameter("arguments").employee || this._employee || "0";
			this.getView().bindElement({
				path: "/Employees/" + this._employee,
				model: "employee"
			});
		},

		onStillToDo: function () {
			MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onOpenDeleteDialog: function () {
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "fcldemo.fcldemo.view.DeleteDialog"
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		onDelete: function (oEvent) {
			var oModel = this.getView().getModel("employee");

			var employeePath = oEvent.getSource().getBindingContext("employee").getPath();
			this._employee = employeePath.charAt(employeePath.length - 1);

			var oEmployeeIdSelected = this._employee; 
			var oEmployees = oModel.getProperty("/Employees"); 

			// // Delete the record from the oEmployees Object 
			oEmployees.splice(oEmployeeIdSelected, 1); 
			// // Update the Model 
			oModel.setProperty("/Employees", oEmployees);

			this.byId("deleteDialog").close();
			this.oRouter.navTo("master", {layout: fioriLibrary.LayoutType.OneColumn});
		},

		onCloseDeleteDialog : function () {
			this.byId("deleteDialog").close();
		},
		
		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onEmployeeMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onEmployeeMatched, this);
		}
	});
});