import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
    private baseUrl = 'http://127.0.0.1:8000/email';

  constructor(private http: HttpClient) {}

  sendEmail(emailModelId: string, chosenEntityId: string){
    const url = `${this.baseUrl}/sendEmail/${emailModelId}/${chosenEntityId}`;
    return fetch(url)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  getEmails() {
    return fetch(this.baseUrl)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  getEmailById(id : string) {
    return fetch(this.baseUrl+'/'+ id)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  getAttachments() {
    return fetch(this.baseUrl+'/attachments/all')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  getAttachmentsById(id: string) {
    return fetch(this.baseUrl+'/attachments/byId/'+id)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  getAttachmentsByEmailId(EmailId: string) {
    return fetch("http://127.0.0.1:8000/email/attachments/byEmailId/"+EmailId)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }



}