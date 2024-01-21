import { Component, Input, EventEmitter, Output,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../../../pdf.service';

@Component({
  selector: 'app-repbox',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './repbox.component.html',
  styleUrls: ['./repbox.component.css'],
  providers: [PdfService]
})
export class RepboxComponent implements OnInit{

  modelsArray :any[] = [];
  @Output() CloseButton: EventEmitter<boolean> = new EventEmitter();
  @Input() ImportedId: string = '';

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
  constructor(private pdfService: PdfService) {}

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
}