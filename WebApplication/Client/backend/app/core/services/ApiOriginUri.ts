import { Injectable } from '@angular/core';

@Injectable()
export class ApiOriginUri {
    constructor(){ }

    /**
     * Gets current Uri to the API host
     */
    get API_ORIGIN_URI(): string {
        return window['__apiUri__'];
    }
}