import * as $ from 'jquery';
import * as Mustache from 'mustache';
import * as Dropzone from 'dropzone'; 
import StepBase from './step.base';

export default class Agenda extends StepBase {

    private isRender: Boolean = false;
    private $containerID: JQuery;
    $inputFile: any;
    obj: JQuery;


    constructor(containerID: string) {
        super();

        if (!containerID || containerID == undefined) {
            throw 'ContainerID is not empty';
        }
        
        this.$containerID = $(containerID);
    }

    render(): void {
        this.isRender = true;
        var template = $('.template').find('#agendar-content').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, {});
        this.$containerID.html(rendered);
    }

    uploadFile() {

        this.$inputFile.change((event: JQuery.Event<HTMLInputElement>) => {
            let input = event.target;

            var files = input.files;
            
            if (this.handleFileUpload(files)) {
                console.log(files);
            }

        });

        this.obj.on('dragenter', event => {
            this.notEventHandler(event);
            $(this.obj).css('border', '1px solid red');
        });

        this.obj.on('dragover', event => {
            this.notEventHandler(event);
        });

        this.obj.on('drop', (event: any) => {
            $(this.obj).css('border', '1px dotted #808080');
            event.preventDefault();
            var files = event.originalEvent.dataTransfer.files;
            if (this.handleFileUpload(files)) {
                console.log(files);
            }
        });

        $(document).on('dragenter', event => {
            this.notEventHandler(event);
        });

        $(document).on('dragover', event => {
            this.notEventHandler(event);
            $(this.obj).css('border', '1px dotted #808080');
        });

        $(document).on('drop', event => {
            this.notEventHandler(event);
        });

    }

    handleFileUpload(files): Boolean {
        let maxsize: number = 51200;
        var _validFileExtensions = [".xls", ".doc", ".docx", ".pdf", ".png"];
        for (var i = 0; i < files.length; i++) {

            var sFileName = files[i].name;
            console.log(files[i].size);

            if (files[i].size <= maxsize || files[i].fileSize <= maxsize) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }

                if (!blnValid) {
                    alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                    return false;
                }

            }
            else {
                alert('Allowed file size exceeded. (Max. 50 MB)');
                return false;
            }
        }

        return true;
    }

    notEventHandler(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    show() {
        if (this.isRender == false) {
            this.render();
            $('.agenda-wrapper').show();
        } else {
            $('.agenda-wrapper').show();
        }
        this.$inputFile = this.$containerID.find('#file');
        this.obj = this.$containerID.find(".dragandrophandler");
        this.uploadFile();
    }

    hide(): void {
        $('.agenda-wrapper').hide();
    }


    getFormData() {
        throw new Error("Method not implemented.");
    }    

    validate(): boolean {
        return true;
    }
}