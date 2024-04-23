import { LightningElement,track,wire } from 'lwc';
import getSObjects from '@salesforce/apex/LWCAssignment2Controller.getSObjects';
import getFieldsForSObject from '@salesforce/apex/LWCAssignment2Controller.getFieldsForSObject';


export default class LWCAssignment2 extends LightningElement {

    @track objectOptions = [];
    @track selectedObject;
    @track fieldOptions = null;
    @track selectedFields = null;
    @track query;

    @wire(getSObjects)
    wiredSObjectNames({ error, data }) {
        if (data) {
            
            this.objectOptions = data.map(obj => {
                return { label: obj, value: obj };
            });
        } else if (error) {
            console.error('Error retrieving sObject names', error);
        }
    }

    handleObjectChange(event) {
        this.selectedObject = event.detail.value;
        //this.selectedFields = []; // Reset selected fields on sObject change
        this.selectedFields=null;
        this.query=null;
    }



    @wire(getFieldsForSObject, { sObjectName: '$selectedObject' })
    wiredFields({ error, data }) {
        if (data) {
            this.fieldOptions = data.map(field => {
                return { label: field.label, value: field.value };
            });
        } else if (error) {
            
            console.error('Error retrieving fields for sObject', error);
        }
    }

    handleFieldChange(event) {
        this.selectedFields = event.detail.value;
        
    }
    generateQuery() {
        if (this.selectedFields.length > 0) {
            this.query = `SELECT ${this.selectedFields.join(', ')} FROM ${this.selectedObject}`;
        } else {
            this.query = 'Please select at least one field.';
        }
    }
       
}