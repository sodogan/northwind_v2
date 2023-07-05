sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
    "sap/ui/Device"
], function (Object, JSONModel, BindingMode, Device) {
    'use strict';

    const defaultModel = Object.extend("sap.ui.demo.walkthrough.orders.model.DefaultModel", {

        constructor: function (oComponent,oModel, oBindingMode) {
            this._oComponent = oComponent;
            this._model = new JSONModel(oModel);
            this._model.setDefaultBindingMode(!oBindingMode ? BindingMode.OneWay : oBindingMode);
            
        },

        getModel: function () {
            return this._model;
        },

        setModel: function (sModelName){
           this._oComponent.setModel(this._model, sModelName);
        }

    });

    return defaultModel;

});