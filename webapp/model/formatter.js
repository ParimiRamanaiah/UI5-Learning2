sap.ui.define([],function (){
    "use strict";

    return {
        formatDate:function(Doj){
            var oDateFormat=sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern:"dd-MM-yyyy"
            },sap.ui.getCore().getConfiguration().getLocale());

            return oDateFormat.format(Doj);
        },

        colorSkill:function(Skill){
            if(Skill==="SD"){
                return "Error";
            }
            else if(Skill==="JAVASCRIPT"){
                return "Warning";
            }
            else{
                return "Success";
            }
        },

        formatSNo:function(Empid){
            var sNo=this.getOwnerComponent().sno;
            sNo++;
            this.getOwnerComponent().sno=sNo;
            return sNo;
        }
    };
});