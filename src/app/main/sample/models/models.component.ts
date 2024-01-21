import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsDescriptionComponent } from '../../sample/models-description/models-description.component';
import { ModelCreatorComponent } from '../../sample/model-creator/model-creator.component';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule,ModelsDescriptionComponent,ModelCreatorComponent],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  modelsArray: any[] = [];

  Description: boolean = false;
  modelId: string = '';
  showInputs=false;
  ngOnInit()
  {
    this.getModels()
  }
  handleCancelEvent(val:boolean){
    this.showInputs=val;
  }
  toggleAddModel(){
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


}
