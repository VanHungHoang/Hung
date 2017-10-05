import * as $ from 'jquery';
import StepBase from './step.base';
import * as Mustache from 'mustache';
import { appSettings, allLabels } from '../main';

export default class Applicant extends StepBase {    
    $containerId: JQuery;
    private isRender: Boolean = false;

    constructor(containerId) {
        super();
        if (!containerId || containerId == undefined)
            return;

        this.$containerId = $(containerId);        
    }

    render() {
        this.isRender = true;

        var me = this;
        me.$containerId.html("");

        var applicantFields = me.convertJSONObject();
        var template = $('.template').find('#applicant-area').html();
        Mustache.parse(template);   // optional, speeds up future uses
        var rendered = Mustache.render(template, { applicantFields: applicantFields });
        me.$containerId.html(rendered);

        var template = $('.template').find('#company-area').html();
        Mustache.parse(template);   // optional, speeds up future uses
        var rendered = Mustache.render(template, { applicantFields: applicantFields });
        me.$containerId.append(rendered);


    }

    show(): void {
        if (this.isRender == false) {
            this.render();
            $('.applicant-wrapper').show();
        } else {
            $('.applicant-wrapper').show();
        }        
    }

    convertJSONObject() {
        var applicantSubFields = appSettings.subscribeFields;
        var applicantRequiredFields = appSettings.requiredFields;
        
        var jsonArr = [], applicantAreaArr = [], companyAreaArr = [];


        for (var i = 0; i < applicantSubFields.length; i++) {
            if (applicantSubFields[i].toString() == "Company" || applicantSubFields[i].toString() == "City" || applicantSubFields[i].toString() == "Institution" || applicantSubFields[i].toString() == "Telephone")
            {
                if (applicantSubFields[i].toString() == "Institution") {
                    jsonArr.push({
                        field: applicantSubFields[i],
                        input: false,
                        applicantArea: false,
                        required: true
                    });
                } else {
                    jsonArr.push({
                        field: applicantSubFields[i],
                        input: true,
                        applicantArea: false,
                        required: false
                    });
                }

            } else {
                if (applicantSubFields[i].toString() == "Country" || applicantSubFields[i].toString() == "Profession") {
                    jsonArr.push({
                        field: applicantSubFields[i],
                        input: false,
                        applicantArea: true,
                        required: true
                    });
                } else {
                    jsonArr.push({
                        field: applicantSubFields[i],
                        input: true,
                        applicantArea: true,
                        required: false
                    });
                }
            }
        }

        for (var i = 0; i < applicantRequiredFields.length; i++) {
            jsonArr[i].required = true;
        }

        for (var i = 0; i < jsonArr.length; i++) {
            if (jsonArr[i].applicantArea == true) {
                applicantAreaArr.push(jsonArr[i]);
            } else {
                companyAreaArr.push(jsonArr[i]);
            }
        }
        
        jsonArr = applicantAreaArr.concat(companyAreaArr);

        console.log(jsonArr);
        return jsonArr;        
    }

    hide(): void {
        $('.applicant-wrapper').hide();
        //throw new Error("Method not implemented.");
    }

    getFormData() {
        throw new Error("Method not implemented.");
    }
    
    validate(): boolean {
        let isValid = false;
        // validate email
        // do something
        // validate country code
        // do something
        // validate mobile number
        // do something
        return isValid;
    }

    getDataFromServer() {
        return [
            { "field": "First Name", "required": true },
            { "field": "Language", "required": true, "data": ["English", "Japanese"] },
            { "field": "Company", "required": false },
            { "field": "EmailAddress", "required": true }
        ]
    }



}