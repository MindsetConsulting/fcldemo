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

		onOpenEditEmployeeDialog: function () {
			if (!this.editDialog) {
				this.editDialog = this.getView().byId("editEmployeeDialog")
			} 
			this.editDialog.open();
		},

		onSaveEditEmployee: function () {
			this.byId("editEmployeeDialog").close();
		},

		onOpenAssignSkillDialog: function () {
			if (!this.assignSkillDialog) {
				this.assignSkillDialog = this.getView().byId("assignSkillDialog")
			} 
			this.assignSkillDialog.open();
		},

		onAssignSkill: function () {
			var assignedSkillNumber = this.getView().getBindingContext("employee").getProperty("AssignedSkills").length;
			var newSkillId = assignedSkillNumber;
			var newSkillTitle = this.getView().byId("SkillTitle").getValue();
			var newSkillType = this.getView().byId("SkillType").getValue();
			var newSkillInstitution = this.getView().byId("Institution").getValue();
			var newSkillDateAcquired = this.getView().byId("DateAcquired").getValue();
			var newSkillRenewal = this.getView().byId("Renewal").getValue();
			var newSkillComfortLevel = this.getView().byId("ComfortLevel").getValue();

			var skillToAssign = {};

			skillToAssign = {
				"SkillId": newSkillId,
				"SkillTitle": newSkillTitle,
				"SkillType": newSkillType,
				"Institution": newSkillInstitution,
				"DateAcquired": newSkillDateAcquired,
				"Renewal": newSkillRenewal,
				"ComfortLevel": newSkillComfortLevel
			};

			var assignedSkills = this.getView().getBindingContext("employee").getProperty("AssignedSkills");
			assignedSkills.push(skillToAssign);
			var employeeAssignedSkillPath = this.getView().getBindingContext("employee").getPath("AssignSkills");
			this.getView().getModel("employee").setProperty(employeeAssignedSkillPath, assignedSkills);

			this.byId("assignSkillDialog").close();
		},

		onCancelAssignSkillDialog: function () {
			this.byId("assignSkillDialog").close();
		},

		onOpenDeleteDialog: function () {
			if (!this.deleteDialog) {
				this.deleteDialog = this.getView().byId("deleteDialog")
			} 
			this.deleteDialog.open();
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