import { Component, Input, EventEmitter, Output,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../../../pdf.service';
import { ModelsService } from '../../../Services/models.service';

@Component({
  selector: 'app-repbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './repbox.component.html',
  styleUrls: ['./repbox.component.css'],
  providers: [PdfService]
})
export class RepboxComponent implements OnInit{

  modelsArray :any[] = [];
  @Output() CloseButton: EventEmitter<boolean> = new EventEmitter();
  @Input() ImportedId: string = '';
 constructor(private modelsService?: ModelsService, private pdfService?: PdfService) {}

  ngOnInit(): void {
    this.getModels()
  }
  quit()
  {
    this.emitEvent();
  }
  emitEvent() {
    this.CloseButton.emit(false);
  }

  downloadPdf(modelId: string): void {
    this.pdfService.downloadPdf(modelId,this.ImportedId).subscribe((response) => {
      console.log(modelId + this.ImportedId);
      const blob = new Blob([response], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = modelId + this.ImportedId +'.pdf';
      link.click();
    });
  }

  getModels() {
    this.modelsService.getModels().then(data => {
      this.modelsArray = data || [];
    });
  }
}