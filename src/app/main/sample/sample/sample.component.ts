// sample.component.ts

import { Component } from '@angular/core';
import { WorkersService } from '../../../Services/workers.service';
import { ProjectsService } from '../../../Services/projects.service'

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
})
export class SampleComponent {
  projectsArray: any[] = [];
  workersArray: any[] = [];
  showTable1: boolean = false;
  showTable2: boolean = false;
  showRepbox: boolean = false;
  elementId: string = '';

  constructor(
    private workersService: WorkersService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.getProjects();
    this.getWorkers();
  }

  toggleRepbox(id: string) {
    this.elementId = id;
    this.showRepbox = true;
  }

  handleCloseButtonEvent(value: boolean) {
    this.showRepbox = value;
  }

  togglePopup(ch: string): void {
    if (ch == 'table1') this.showTable1 = !this.showTable1;
    else if (ch == 'table2') this.showTable2 = !this.showTable2;
  }

  getProjects() {
    this.projectsService.getProjects().then(data => {
      this.projectsArray = data || [];
    });
  }

  getWorkers() {
    this.workersService.getWorkers().then(data => {
      this.workersArray = data || [];
    });
  }
}
