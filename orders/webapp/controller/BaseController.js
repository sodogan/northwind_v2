sap.ui.define([
    "sap/ui/core/mvc/Controller",
    '../model/formatter',
    '../utils/Utility',
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
    "sap/ui/core/message/ControlMessageProcessor",
    'sap/ui/core/mvc/OverrideExecution'
], function (Controller, formatter, Utility, Fragment, History, ControlMessageProcessor,OverrideExecution) {
    'use strict';

    //common functions here
    return Controller.extend("sap.ui.demo.walkthrough.orders.controller.BaseController",
        {
            metadata: {
				stereotype: "controller",
				methods: {
					"getUtility": 	{"public": true, "final": false,"overrideExecution": OverrideExecution.After},//can be overridable
			    	 "getErrorHandler":  {"public": true, "final": true}

				}
			},

            formatter: formatter,

            onInit: function () {
                debugger;
                //create the utility   
                if (!this._utility) {
                    this._utility = new Utility(this);
                }
            },
            //Base method to get the utility class!
            getUtility: function (){
              return this._utility;
            },
            /**
            * Convenience method for getting the view model by name in every controller of the application.
            * @public
            * @param {string} sName the model name
            * @returns {sap.ui.model.Model} the model instance
            */
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },

            /**
             * Convenience method for setting the view model in every controller of the application.
             * @public
             * @param {sap.ui.model.Model} oModel the model instance
             * @param {string} sName the model name
             * @returns {sap.ui.mvc.View} the view instance
             */
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },

            /**
           * Get Base/Global Model
           * @public
           * @returns {sap.ui.model.resource.ResourceModel} 
           */
            getBaseModel: function () {
                return this.getOwnerComponent().getModel();
            },


            /**
             * Convenience method for getting the resource bundle.
             * @public
             * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
             */
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },

            /**
            * Convenience method for getting the text from resource Bundle
            * @public
            * @returns {string}
            */
            getText(sTextName) {
                return this.getResourceBundle().getText(sTextName);
            },

            //get the router
            getRouter: function () {
                return this.getOwnerComponent().getRouter();
            },
            getErrorHandler: function () {
                return this.getOwnerComponent().getErrorHandler();
            },
            getAppStateModel: function () {
                return this.getOwnerComponent().getModel("appState")
            },
            /** 
            * Register Message Manager
            * @private  
            */
            registerMessageManager: function () {

                this.getMessageManager().registerMessageProcessor(new ControlMessageProcessor());
            },
            /**
             * Convenience method for accessing the MessageManager in every controller of the application.
             * @public
             * @returns {sap.ui.core.routing.Router} the router for this component
             */
            getMessageManager: function () {
                return sap.ui.getCore().getMessageManager();
            },
            /**
             * Convenience method for clearing out all messages 
             * @public
             */
            clearAllMessages: function () {
                //clear out the message manager
                let oMessageManager = this.getMessageManager();
                oMessageManager.removeAllMessages();
            },
            onModelHasChange: function (oEvent) {

                //Now we can do set that there is a change happening
                //get the appstate model and set the hasPending to true
                let _appStateModel = this.getAppStateModel();

                const stateData = _appStateModel.getData();
                //set the property to true
                _appStateModel.setProperty("/hasPendingChanges", true);

            },
            //check the length of the error messages and retrn true or false
            hasErrorMessages: function () {
                let oMessageManager = this.getMessageManager();
                //check if there is any messages
                return oMessageManager.getMessageModel().getData().length > 0 ? true : false;

            },
            onNavBack: function () {
                var oHistory, sPreviousHash;

                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("orders", {}, true /*no history*/);
                }
            }


        }
    );


});