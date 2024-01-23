
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class KeywordService {
  private baseUrl = 'http://127.0.0.1:8000/keywords';

  constructor() {}

  getKeywords() {
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

  getDistinctConcernedObjects() {
    return fetch('http://127.0.0.1:8000/keywordsObjects')
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