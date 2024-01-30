import { Component, Input, EventEmitter, Output,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../../Services/pdf.service';
import { ModelsService } from '../../../Services/models.service';
import { EmailService } from '../../../Services/email.service';

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
  @Input() chosenEntityId: string = '';
  @Input() isMail: boolean = false;
  modelsToAttach: string []= [];
  emailModelId: string ='';

 constructor(private modelsService?: ModelsService, private pdfService?: PdfService,private emailService?: EmailService) {}

  ngOnInit(): void {
    this.getModels()
  }
  quit()
  {
    this.CloseButton.emit(false);
  }

  sendEmail(){
    this.emailService.sendEmail(this.emailModelId, this.chosenEntityId,this.modelsToAttach).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  }

  downloadPdf(modelId: string): void {
    this.pdfService.downloadPdf(modelId,this.chosenEntityId).subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = modelId + this.chosenEntityId +'.pdf';
      link.click();
    });
  }

  getModels() {
    this.modelsService.getModels().then(data => {
      this.modelsArray = data || [];
    });
  }
  
  saveModelToAttach(selectedObjId: string) {
    const index = this.modelsToAttach.indexOf(selectedObjId);
    if (index !== -1) {
      this.modelsToAttach.splice(index, 1);
    } else {
      this.modelsToAttach.push(selectedObjId);
    }
    console.log(this.modelsToAttach)

  }
  saveModelToSend(id:string)
  {
    this.emailModelId = id;
  }
}