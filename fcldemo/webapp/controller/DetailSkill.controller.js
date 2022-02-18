sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
	"sap/f/library",
	"sap/ui/core/Fragment"
], function (JSONModel, Controller, MessageBox, fioriLibrary, Fragment) {
	"use strict";

	return Controller.extend("fcldemo.fcldemo.controller.DetailSkill", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("detailSkill").attachPatternMatched(this._onPatternMatch, this);
		},

		_onPatternMatch: function (oEvent) {
			this._skill = oEvent.getParameter("arguments").skill || this._skill || "0";
			this._employee = oEvent.getParameter("arguments").employee || this._employee || "0";

			this.getView().bindElement({
				path: "/Employees/" + this._employee + "/AssignedSkills/" + this._skill,
				model: "employee"
			});
		},

        onStillToDo: function () {
			MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
		},

		onOpenEditSkillDialog: function () {
			if (!this.editDialog) {
				this.editDialog = this.loadFragment({
					name: "fcldemo.fcldemo.view.EditSkillDialog"
				});
			} 
			this.editDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		onSaveEditSkill: function () {
			this.byId("editSkillDialog").close();
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

		onCloseDeleteDialog : function () {
			this.byId("deleteDialog").close();
		},

		onDelete: function (oEvent) {
			var oModel = this.getView().getModel("employee");

			var employeePath = oEvent.getSource().getBindingContext("employee").getPath();
			this._employee = employeePath.charAt(11);

			var assignedSkillPath = oEvent.getSource().getBindingContext("employee").getPath();
			this._assignedSkill = assignedSkillPath.charAt(assignedSkillPath.length - 1);

			var oAssignedSkillIdSelected = this._assignedSkill; 
			var oAssignedSkill = oModel.getProperty("/Employees/" + this._employee + "/AssignedSkills"); 

			// // Delete the record from the oEmployees Object 
			oAssignedSkill.splice(oAssignedSkillIdSelected, 1); 
			// // Update the Model 
			oModel.setProperty("/Employees/" + this._employee + "/AssignedSkills", oAssignedSkill);

			this.byId("deleteDialog").close();
		},

		onExit: function () {
			this.oRouter.getRoute("detailSkill").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});