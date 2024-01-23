// models.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsDescriptionComponent } from '../../sample/models-description/models-description.component';
import { ModelCreatorComponent } from '../../sample/model-creator/model-creator.component';
import { ConfirmationComponent } from '../../sample/confirmation/confirmation.component';
import { ModelsService } from '../../../Services/models.service';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [
    CommonModule,
    ModelsDescriptionComponent,
    ModelCreatorComponent,
    ConfirmationComponent,
  ],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css'],
})
export class ModelsComponent implements OnInit {
  modelsArray: any[] = [];
  Description: boolean = false;
  modelId: string = '';
  id: string = '';
  actionText: string = '';
  showInputs = false;
  showConfirmation = false;
  toDelete = false;

  constructor(private modelsService: ModelsService) {}

  getModels() {
    this.modelsService.getModels().then(data => {
      this.modelsArray = data || [];
    });
  }
  deleteModel(id: string) {
    this.modelsService.deleteModel(id).then(() => {
      this.getModels();
    });
  }
  ngOnInit() {
    this.getModels();
  }

  toggleAddModel() {
    this.showInputs = !this.showInputs;
  }



  toggleConfirmation(id: string) {
    this.showConfirmation = true;
    this.actionText = 'delete the model?';
    this.id = id;
  }

  showDescription(id: string) {
    this.modelId = id;
    this.Description = !this.Description;
  }

  handleConfirmation(val: boolean) {
    if (val) {
      this.deleteModel(this.id);
      this.showConfirmation = false;
    } else {
      this.showConfirmation = false;
    }
  }
}
