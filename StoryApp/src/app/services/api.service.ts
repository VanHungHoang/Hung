import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Author } from "app/model/author.model";

@Injectable() 
export class ApiService {
    constructor(private _http: Http) {}

    getApi(_url:string) {
        return this._http.get(_url)
            .map((response: Response) =><any> response.json() )
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
