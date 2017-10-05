import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiOriginUri } from '../../core/services/ApiOriginUri';
import { DataService } from '../../core/services/data.service';

@Injectable()
export class TranslationService {
    constructor(private apiUri: ApiOriginUri, private dataService: DataService){}

    get(twoLetterLanguage?: string): Observable<Response>{
        return this.dataService.get(this.apiUri.API_ORIGIN_URI + '/Translation', { lang: twoLetterLanguage || 'en' });
    }
}
