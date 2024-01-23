import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private baseUrl = 'http://127.0.0.1:8000/projects';

  constructor() {}

  getProjects() {
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
}