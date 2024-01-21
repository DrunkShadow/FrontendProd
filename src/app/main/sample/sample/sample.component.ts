import { Component } from '@angular/core';




@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})

export class SampleComponent {
  projectsArray: any[] = [];
  workersArray: any[] = [];

  showTable1: boolean = false;
  showTable2: boolean = false;
  showRepbox: boolean = false;
  elementId: string = '';
  ngOnInit() {
    this.getProjects()
    this.getWorkers()
  }



  toggleRepbox(id : string) {
    this.elementId = id;
    this.showRepbox = true;
  }
  handleCloseButtonEvent(value: boolean) {
    this.showRepbox = value;
  }
  togglePopup(ch : string): void {
    if(ch== 'table1')this.showTable1 = !this.showTable1
    else if(ch== 'table2') this.showTable2 = !this.showTable2
    
  }

  getProjects() {
    fetch('http://127.0.0.1:8000/projects')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.projectsArray = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  getWorkers() {
    fetch('http://127.0.0.1:8000/workers')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.workersArray = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  
}
