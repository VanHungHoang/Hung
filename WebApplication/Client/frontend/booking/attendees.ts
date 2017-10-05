import * as $ from 'jquery';
import * as Mustache from 'mustache';
import StepBase from './step.base';

export default class Attendees extends StepBase {
    private isRender: Boolean = false;
    private $containerID: JQuery;

    constructor(containerID: string) {

        super();

        if (!containerID || containerID == undefined) {
            throw 'ContainerID is not empty';
        }

        this.$containerID = $(containerID);

        //this.show();
    }    

    show(): void {
        if (this.isRender == false) {
            this.render();
            $('.attendees-wrapper').show();
        } else {
            $('.attendees-wrapper').show();
        }        
    }

    render() {
        this.isRender = true;
        var template = $('.template').find('#other-attendees-wrapper').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, {});
        this.$containerID.html(rendered);
    }

    hide(): void {
        $('.attendees-wrapper').hide();
        //throw new Error("Method not implemented.");
    }

    getFormData() {
        throw new Error("Method not implemented.");
    }

    validate(): boolean {
        throw new Error("Method not implemented.");
    }
}