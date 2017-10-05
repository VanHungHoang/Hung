import * as $ from 'jquery';
import { Settings } from '../app';

export default abstract class StepBase {
    requiredFields: Array<string>;
    constructor() {
        
    }

    abstract show(): void;

    abstract hide(): void;

    abstract getFormData(): any;

    abstract validate(): boolean;

    abstract render(): void;
}