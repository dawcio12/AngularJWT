import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    public errorMessage: string = '';
    private errorSubject:BehaviorSubject<string> = new BehaviorSubject("");
    constructor() {
    }
    public handleError(error: any): void {
        this.errorSubject.next(error);
        
    }

    currentErrorValue(): Observable<string> {
        return this.errorSubject.asObservable();
      }

      set setcurrentErrorValue(one:string) {
        this.errorSubject.next(one);
      }
}