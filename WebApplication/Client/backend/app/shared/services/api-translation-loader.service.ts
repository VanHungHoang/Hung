import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { 
    TranslateLoader, 
    MissingTranslationHandler, 
    MissingTranslationHandlerParams 
} from '@ngx-translate/core';

import { TranslationService } from './translation.service';

@Injectable()
export class ApiTranslationLoader extends TranslateLoader {
    constructor(private translationService: TranslationService){ super();}
    getTranslation(lang: string): Observable<any> {
        return this.translationService.get(lang);
    }
}