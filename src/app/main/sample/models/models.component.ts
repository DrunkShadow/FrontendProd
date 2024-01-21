import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsDescriptionComponent } from '../../sample/models-description/models-description.component';
import { ModelCreatorComponent } from '../../sample/model-creator/model-creator.component';
import { ConfirmationComponent } from '../../sample/confirmation/confirmation.component';
@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule,ModelsDescriptionComponent,ModelCreatorComponent,ConfirmationComponent],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  modelsArray: any[] = [];

  Description: boolean = false;
  modelId: string = '';
  id: string =''
  actionText: string =''
  showInputs=false;
  showConfirmation=false;
  toDelete = false
  ngOnInit()
  {
    this.getModels()
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
  toggleConfirmation(id:string){
    this.showConfirmation=true;
    this.actionText="delete the model?"
    this.id= id;

  }

  showDescription(id : string)
  {
    this.modelId = id;
    this.Description = !this.Description;

  }

  handelConfirmation(val:boolean){
    if (val){
      
      this.deleteModel(this.id)
      this.showConfirmation=false;
    }
    else{
      this.showConfirmation=false;
    }

  }
  deleteModel(id : string)
  {
      fetch('http://127.0.0.1:8000/models/'+id, {
        method: 'DELETE'
      }).then(response => {
        console.log('Model Deleted successfully:', response);
        this.getModels()

      })
  }


}
