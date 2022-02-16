sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
], function (JSONModel, Controller, MessageBox) {
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

		onExit: function () {
			this.oRouter.getRoute("detailSkill").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});