import { Component, OnInit , Input,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../Services/email.service';

@Component({
  selector: 'app-email-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-content.component.html',
  styleUrls: ['./email-content.component.scss']
})
export class EmailContentComponent implements OnInit {

  @Input() retrievedEmailId: string = '';
  @Output() CloseButton: EventEmitter<boolean> = new EventEmitter();
  attArray: any[] = [];
  chosenEmail: any={};

  constructor(private emailService?: EmailService) {}

  ngOnInit(): void {
    this.getAttachmentsByEmailId()
    this.getEmailId()  
  }
  getAttachmentsByEmailId()
  {
    this.emailService.getAttachmentsByEmailId(this.retrievedEmailId).then(data => {
      this.attArray = data || [];
    });
  }

  getEmailId()
  {
    this.emailService.getEmailById(this.retrievedEmailId).then(data => {
      this.chosenEmail = data || {};
    });
  }
  quit()
  {
    this.CloseButton.emit(false)}

}
