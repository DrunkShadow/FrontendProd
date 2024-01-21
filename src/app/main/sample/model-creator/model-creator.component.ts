import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsDescriptionComponent } from '../../sample/models-description/models-description.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-model-creator',
  standalone: true,
  imports: [CommonModule,ModelsDescriptionComponent,FormsModule,ModelCreatorComponent],

  templateUrl: './model-creator.component.html',
  styleUrls: ['./model-creator.component.scss']
})

export class ModelCreatorComponent implements OnInit {

  keyObjectsArray : any[] = [];
  selectObjects: string = '';
  clickedObjects: string[] = [];
  keywordsArray: any[] = [];
  Description: boolean = false;
  constructor(private http: HttpClient) {}
  inputModelId :string ='';
  inputModelText :string ='';
  inputModelDiffusion :string ='';

  @Output() Cancel: EventEmitter<boolean> = new EventEmitter();


  ngOnInit()
  {
    this.getKeywords()
    this.getDistinctConcernedObjects()
  }
  emitEvent() {
    this.Cancel.emit(false);
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

  cancelAdding(){
    this.inputModelId  ='';
    this.inputModelText  ='';
    this.inputModelDiffusion  ='';
    this.clickedObjects = [];
    this.emitEvent();
    

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
