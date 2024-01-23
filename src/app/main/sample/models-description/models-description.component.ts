import { Component,Input,OnInit,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelsService } from '../../../Services/models.service';

@Component({
  selector: 'app-models-description',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './models-description.component.html',
  styleUrls: ['./models-description.component.css']
})
export class ModelsDescriptionComponent implements OnInit {
  @Input() desId: string = '';
  @Output() closingSignal = new EventEmitter();
  chosenModel: any = {};
  editingMode = false;
  constructor(private modelsService: ModelsService) {}

  ngOnInit()
  {
    this.getModelbyId()
  }
  getModelbyId() {
    this.modelsService.getModelbyId(this.desId).then(data => {
      this.chosenModel = data || [];
  })
  }
  
  sendSignal()
  {
    this.closingSignal.emit();
  }


  startEditing() {
    this.editingMode = true;

  }

  saveChanges() {
    this.editingMode = false;
    fetch(`http://127.0.0.1:8000/models/${this.desId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: this.chosenModel.text }),
    });
  }
    
  

  cancelEditing() {
    this.editingMode = false;
  }

}




