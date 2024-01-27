import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
    private baseUrl = 'http://127.0.0.1:8000/services';

  constructor(private http: HttpClient) {}

  sendEmail(emailModelId: string, chosenEntityId: string, modelsToAttach:string[]): Observable<string> {
    const url = `${this.baseUrl}/sendEmail/${emailModelId}/${chosenEntityId}`;
    let parameters = new HttpParams();
    parameters = parameters.append('sentAttachments', modelsToAttach.join(', '));
    console.log(parameters);

    return this.http.get<string>(url,{ params: parameters });

  }
}