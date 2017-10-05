import { HashLocationStrategy } from "@angular/common";
export class ExtHashLocationStrategy extends HashLocationStrategy {
    prepareExternalUrl(internal: string): string {
        const query = window.location.search || '';
        const url = this.getBaseHref() + (query.length > 0 ? query : '') + '#' + internal + query;
        return url;
    }
}