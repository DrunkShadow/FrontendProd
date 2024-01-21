import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsDescriptionComponent } from '../../sample/models-description/models-description.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule,ModelsDescriptionComponent,FormsModule],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  modelsArray: any[] = [];
  keyObjectsArray : any[] = [];
  selectObjects: string = '';
  clickedObjects: string[] = [];
  keywordsArray: any[] = [];

  Description: boolean = false;
  modelId: string = '';
  showInputs=false;
  constructor(private http: HttpClient) {}

  inputModelId :string ='';
  inputModelText :string ='';
  inputModelDiffusion :string ='';


  

  ngOnInit()
  {
    this.getKeywords()
    this.getModels()
    this.getDistinctConcernedObjects()
  }
  getKeywords() {
    fetch('http://127.0.0.1:8000/keywords')
      .then(response => response.json())
      .then(data => {
        this.keywordsArray = data;
      })

  }


  onChosen(selectedObjName: string) {
    const index = this.clickedObjects.indexOf(selectedObjName);
    if (index !== -1) {
      this.clickedObjects.splice(index, 1);
    } else {
      this.clickedObjects.push(selectedObjName);
    }  
  }

  getDistinctConcernedObjects() {
    fetch('http://127.0.0.1:8000/keywordsObjects')
      .then(response => response.json())
      .then(data => {
        this.keyObjectsArray = data;
      })
  }

  toggleAddModel(){
    this.inputModelId  ='';
    this.inputModelText  ='';
    this.inputModelDiffusion  ='';
    this.clickedObjects = [];
    this.showInputs=!this.showInputs;

  }

 
  getModels() {
    fetch('http://127.0.0.1:8000/models')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.modelsArray = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  showDescription(id : string)
  {
    this.modelId = id;
    this.Description = true;

  }


  saveModel() {
    var projExists=0;
    var workerExists = 0;
    if(this.clickedObjects.indexOf('project')>-1) projExists=1;
    if(this.clickedObjects.indexOf('worker')>-1) workerExists=1;
    this.http.post(`http://127.0.0.1:8000/models/${this.inputModelId}/${this.inputModelText}/${this.inputModelDiffusion}/${projExists}/${workerExists}`, { responseType: 'text' })
      .subscribe(response => {
        console.log('Model saved successfully:', response);
      }, error => {
        console.error('Error saving model:', error);
      });
  }

}
