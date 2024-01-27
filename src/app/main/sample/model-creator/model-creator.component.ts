import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsDescriptionComponent } from '../../sample/models-description/models-description.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModelsService } from '../../../Services/models.service';
import { KeywordService } from '../../../Services/keywords.service';

@Component({
  selector: 'app-model-creator',
  standalone: true,
  imports: [CommonModule,ModelsDescriptionComponent,FormsModule,ModelCreatorComponent],

  templateUrl: './model-creator.component.html',
  styleUrls: ['./model-creator.component.scss']
})

export class ModelCreatorComponent implements OnInit {

  keyObjectsArray : any[] = [];
  clickedObjects: string[] = [];
  keywordsArray: any[] = [];
  Description: boolean = false;
  inputModelId :string ='';
  inputModelText :string ='';
  inputModelDiffusion :string ='';
  isEmail : boolean = false;
  @Output() Cancel = new EventEmitter<any>();
  @Output() Refresh = new EventEmitter<any>();

  constructor(private modelsService?: ModelsService, private keywordService?: KeywordService) {}

  ngOnInit()
  {
    this.getKeywords()
    this.getDistinctConcernedObjects()
  }
  

  getKeywords() {
    this.keywordService.getKeywords().then(data => {
      this.keywordsArray = data || [];
    });

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
    this.keywordService.getDistinctConcernedObjects().then(data => {
      this.keyObjectsArray = data || [];
    });
  }

  cancelAdding(){
    this.inputModelId  ='';
    this.inputModelText  ='';
    this.clickedObjects = [];
    this.Cancel.emit();
  }


  saveModel() {
    var isEmail = 0;
    var projExists=0;
    var workerExists = 0;
    if(this.isEmail) isEmail=1;
    if(this.clickedObjects.indexOf('project')>-1) projExists=1;
    if(this.clickedObjects.indexOf('worker')>-1) workerExists=1;
    this.modelsService.AddModel(this.inputModelId,this.inputModelText,projExists,workerExists,isEmail)
    .then(response => {
      console.log('Model saved successfully:', response);
      this.cancelAdding()
      this.Refresh.emit()
    }
    )
  }


  // saveModel() {
  //   var projExists=0;
  //   var workerExists = 0;
  //   if(this.clickedObjects.indexOf('project')>-1) projExists=1;
  //   if(this.clickedObjects.indexOf('worker')>-1) workerExists=1;
  //   this.http.post(`http://127.0.0.1:8000/models/${this.inputModelId}/${this.inputModelText}/${projExists}/${workerExists}`, { responseType: 'text' })
  //     .subscribe(response => {
  //       console.log('Model saved successfully:', response);
  //       this.cancelAdding();
  //       this.Refresh.emit();
  //     }, error => {
  //       console.error('Error saving model:', error);
  //     });
  // }
  // ADDITION WITH A LINK

}
