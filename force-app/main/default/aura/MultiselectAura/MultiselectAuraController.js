({
    init : function(component, event, helper) {
        var action = component.get("c.getSObjects");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var objectOptions = response.getReturnValue();
                component.set("v.sObjectOptions", objectOptions);
            } else {
                console.log("Failed to retrieve Salesforce objects");
            }
        });
        $A.enqueueAction(action);
    },

    getFields: function(component, event, helper) {
        var selectedSObject = component.find("sObjectSelector").get("v.value");
        if (selectedSObject) {
            // Call the server-side controller method to fetch the fields of the selected SObject
            var action = component.get("c.getFieldsForSObject");
            action.setParams({ sObjectName: selectedSObject });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var fields = response.getReturnValue();
                    var fieldOptions = [];
                    fields.forEach(function(field) {
                        fieldOptions.push({ label: field, value: field });
                    });
                    component.set("v.fieldOptions", fieldOptions);
                    component.set("v.selectedFields", []);
                    component.set("v.queryResult", null);
                    
                } else {
                    console.error("Error fetching fields for " + selectedSObject + ": " + state);
                }
            });
            $A.enqueueAction(action);
        } else {
            // Reset field options if no SObject is selected
            component.set("v.fieldOptions", []);
        }
    },
    
     generateQuery : function(component, event, helper) {
        var selectedFields = component.get("v.selectedFields");
        var query = "SELECT ";
        query += selectedFields.join(", ") + " FROM " + component.find("sObjectSelector").get("v.value");
        // You can replace 'YourObject__c' with the API name of your object
        
        component.set("v.queryResult", query);
    }
    
    
    
    
     
    
})