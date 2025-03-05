sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "com/ram/project1/model/formatter",
    "sap/ui/model/Filter"

], (Controller,JSONModel,Dialog,formatter,Filter) => {
    "use strict";

    return Controller.extend("com.ram.project1.controller.View1", {
        onInit() {

            //local json data with multiUIelements
            //var lookUpModel=this.getOwnerComponent().getModel("lookUpModel");
            // lookUpModel.setData({
            //     "aGender":[
            //         {
            //             gender:"Male",
            //             key:"M"
            //         },
            //         {
            //             gender:"Female",
            //             key:"F"
            //         }
            //     ],
            //     "aStatus":[
            //         {
            //           status:"Yes",
            //           key:"Y"  
            //     },
            //     {
            //         status:"No",
            //         key:"N"
            //     }
            // ],
            // "aWeek":[
            //     {
            //         day:"Monday",
            //         key:"M"
            //     },
            //     {
            //         day:"Tuesday",
            //         key:"T"
            //     },
            //     {
            //         day:"Wednesday",
            //         key:"W"
            //     },
            //     {
            //         day:"Thursday",
            //         key:"TT"
            //     },
            //     {
            //         day:"Friday",
            //         key:"F"
            //     },
            //     {
            //         day:"Saturday",
            //         key:"S"
            //     },
            //     {
            //         day:"Sunday",
            //         key:"SS"
            //     },
            // ]
            // })

            // var myJsonModel=new JSONModel(
            //     {
            //     "aEmp":[
            //         {
            //         "Empid":"101",
            //         "Name":"Ram",
            //         "Designation":"Team Lead"
            //     },
            //     {
            //         "Empid":"102",
            //         "Name":"Sai",
            //         "Designation":"Software Enginer"
            //     }
            // ]
            // });

            // this.getView().setModel(myJsonModel,"jsonModel");
        
            var empJsonModel=new JSONModel({})

            this.getView().setModel(empJsonModel,"jsonModel")

            //var oModel=this.getOwnerComponent().getModel("");
            var oModel=this.getOwnerComponent().getModel();

            oModel.read("/EmployeeSet",{
                success:function(data){
                    for(let i=0; i<data.results.length; i++){
                        data.results[i].SNo=i+1;
                    }
                    empJsonModel.setData(data);
                }
            })
        },

        f:formatter,
        
        onSubmit:function(){
            var selectBoxValue=this.byId("idSelect").getSelectedKey();
            console.log("selectBoxValue",selectBoxValue);

            var comboBoxValue=this.byId("idCombo").getSelectedKey();
            console.log("comboBoxValue",comboBoxValue);

            var multicomboBoxValue=this.byId("idmultiCombo").getSelectedKeys();
            console.log("multicomboBoxValue",multicomboBoxValue);

            var radioValue=this.byId("idRadio").getSelectedIndex();
            console.log("radioValue",radioValue);
        },

        onSelect:function(){
            var selectBoxValue=this.byId("idSelect").getSelectedKey();
            console.log("selectBoxValue",selectBoxValue);
        },

        onCombo:function(){
            var comboBoxValue=this.byId("idCombo").getSelectedKey();
            console.log("comboBoxValue",comboBoxValue);
        },

        onMultiCombo:function(){
            var multicomboBoxValue=this.byId("idmultiCombo").getSelectedKeys();
            console.log("multicomboBoxValue",multicomboBoxValue);
        },

        onRadio:function(){
            var radioValue=this.byId("idRadio").getSelectedIndex();
            console.log("radioValue",radioValue);
        },

        onValueHelp:function(){
            //alert("Hey! I am Alert of value help");

            //this is not the good approach instead of this we have to use fragment for resusebility
            // var dialog=new Dialog({
            //     title:"Employees"
            // })
            // dialog.open();

            //var dialog
            if(this.dialog===undefined){
            this.dialog=sap.ui.xmlfragment(this.getView().getId(),"com.ram.project1.view.EmpidF4Help",this);
            this.getView().addDependent(this.dialog);
            }
            // this.dialog=sap.ui.xmlfragment(this.getView().getId(),"com.ram.project1.view.EmpidF4Help",this);
            // this.getView().addDependent(this.dialog); //dialog

            this.dialog.open(); //dialog.open()

        },

        onClose:function(){
            this.dialog.close();
        },

        onRowPress:function(oEvent){
            var empId=oEvent.getSource().getBindingContext().getProperty("Empid");
            this.getView().byId("idInput").setValue(empId);
            this.dialog.close();
        },

        onPressGo:function(){
            var aFilters=[];
            var desig=this.getView().byId("Idgo").getValue();

            var skill=this.getView().byId("Idgoo").getValue();

            var id=this.getView().byId("IdempId").getValue();

            var name=this.getView().byId("IdName").getValue();

            var sal1=this.getView().byId("IdSal").getValue();

            var sal2=this.getView().byId("IdSal1").getValue();

            var salOpr=this.getView().byId("idOpr").getSelectedKey();

            var data=this.getView().byId("idDoj").getValue();

            if(data!==""){
                //console.log(data);
                aFilters.push(new Filter("Doj", "EQ",data));

                //console.log(aFilters);
            }

            if(desig!==""){
            aFilters.push(new Filter("Designation", "EQ",desig));
            }
            if(skill!==""){
            aFilters.push(new Filter("Skill", "EQ",skill));
            }

            if(id!==""){
                aFilters.push(new Filter("Empid", "EQ",id));
            }

            if(name!==""){
                // aFilters.push(new Filter("Name", "EQ",name));

                aFilters.push(new Filter("Name", "Contains",name));
            }

            if(sal1!=="" || sal2!==""){
                // aFilters.push(new Filter("Salary", "EQ",sal));

                // aFilters.push(new Filter("Salary", salOpr,sal));

                aFilters.push(new Filter("Salary", salOpr,sal1,sal2));
            }


            this.byId("table1").getBinding("items").filter(aFilters);
            //console.log(Data);
        },

        onSelect:function(){
            var selectOpr=this.byId("idOpr").getSelectedKey();
            if(selectOpr==="BT"){
               this.byId("IdSal1").setVisible(true);
            } 
            else{
               this.byId("IdSal1").setVisible(false);
            }
        },

        onPressReset:function(){
            this.getView().byId("Idgo").setValue("");

            this.getView().byId("Idgoo").setValue("");

            this.getView().byId("IdempId").setValue("");

            this.getView().byId("IdName").setValue("");

            this.getView().byId("IdSal").setValue("");

            this.getView().byId("IdSal1").setValue("");

            this.byId("IdSal1").setVisible(false);

            this.getView().byId("idOpr").setSelectedKey("Equal");

            this.byId("idDoj").setValue("");

            this.byId("table1").getBinding("items").filter([]);
        }
    });
});