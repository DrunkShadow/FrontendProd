import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  private baseUrl = 'http://127.0.0.1:8000/models';

  constructor() {}

  getModels() {
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

  deleteModel(id: string) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    }).then(response => {
      console.log('Model Deleted successfully:', response);
    });
  }

  getModelbyId(modelId:string) {
    return fetch(`${this.baseUrl}/${modelId}`)
      .then(response => response.json())
  }
  AddModel(inputModelId:string,inputModelText:string,projExists:number,workerExists : number,isEmail:number,modelsToAttach :string[]){
    return fetch(`http://127.0.0.1:8000/models`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        modelId: inputModelId,
        modelText: inputModelText,
        modelConcernsProject: projExists,
        modelConcernsWorker: workerExists,
        modelConcernsEmail:isEmail,
        modelEmailAttachment:modelsToAttach
      }),
    })
  }
}