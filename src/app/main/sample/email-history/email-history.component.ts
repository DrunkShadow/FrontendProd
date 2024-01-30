import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../Services/email.service';
import { CommonModule } from '@angular/common';
import { EmailContentComponent } from '../../sample/email-content/email-content.component'

@Component({
  selector: 'app-email-history',
  standalone: true,
  imports: [CommonModule,EmailContentComponent],
  templateUrl: './email-history.component.html',
  styleUrls: ['./email-history.component.scss']
})
export class EmailHistoryComponent implements OnInit {

  emailsArray :any[] = []
  attArray :any[] = []
  showEmail=false
  chosenEmailId : string =''
  constructor(private emailService?: EmailService) {}

  ngOnInit(): void {
    this.getEmails();
    this.getAttachments();
  }
  getEmails() {
    this.emailService.getEmails().then(data => {
      this.emailsArray = data || [];
      console.log('email')
      console.log(this.emailsArray);

    });
  }
  getAttachments() {
    this.emailService.getAttachments().then(data => {
      this.attArray = data || [];
    });
  }
  showEmailContent(id : string)
  {
    this.showEmail=!this.showEmail;
    this.chosenEmailId=id;
  }

  

}
