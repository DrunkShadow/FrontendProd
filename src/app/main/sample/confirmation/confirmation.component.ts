import { Component, OnInit, Output,EventEmitter,Input} from '@angular/core';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent{
  
  @Output() Confirmation = new EventEmitter<boolean>();
  @Input() action: string =''
  
  ConfirmAction(val :boolean)
  {
    this.Confirmation.emit(val);
  }

}
