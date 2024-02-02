import { Component, OnInit } from '@angular/core';
import { MaterielleService } from '../../../Services/materielle.services'
import { PdfService } from '../../../Services/pdf.service'

import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materielle',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './materielle.component.html',
  styleUrls: ['./materielle.component.scss']
})
export class MaterielleComponent implements OnInit {

  ref :string = (Math.floor(Math.random()*10**12)).toString();
  title :string ='';
  desc :string ='';
  prix :string ='';
  date :string ='';
  cat :string ='';
  height:number = 0;
  width: number = 0;
  perRow: number = 3;
  isEditingHeight: boolean = false;
  isEditingWidth: boolean = false;
  isEditingPerRow: boolean = false;
  materielleArray: any[] = [];
  categoriesArray: any[] = [];
  chosenCat : string ='All';
  showTable: boolean = false;
  numberOfBarCodes : number;
  constructor(
    private materielleService: MaterielleService,
    private pdfService: PdfService,
    private modalService: NgbModal
  ) {}
  
  ngOnInit(): void {
    this.getMaterielle();
    this.getDistinctCategories()

  }
  togglePopup(): void {
    this.showTable = !this.showTable;
  }
  getMaterielle()
  {
    this.materielleService.getMaterielle().then(data => {
      this.materielleArray = data || [];
      this.numberOfBarCodes = this.materielleArray.length;
    });
  }
  
  deleteMaterielle(reference: string){
    this.materielleService.deleteMaterielle(reference).then(() => {
      this.getMaterielle();
    });
  }
  startEditing(property: string): void {
    if (property === 'height') {
      this.isEditingHeight = true;
    } else if (property === 'width') {
      this.isEditingWidth = true;
    } else if (property === 'perRow') {
      this.isEditingPerRow = true;
    }
  }
  
  stopEditing(property: string): void {
    if (property === 'height') {
      this.isEditingHeight = false;
    } else if (property === 'width') {
      this.isEditingWidth = false;
    } else if (property === 'perRow') {
      this.isEditingPerRow = false;
      this.width = this.calculateWidth();
      this.height = this.calculateHeight();
    }
  }
  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true
    });
  }
  
  resetValues(){
    this.ref = Math.floor(Math.random()*10**12).toString();
    this.title ='';
    this.desc ='';
    this.prix ='';
    this.date ='';
    this.cat ='';
  }
  addMaterielle(){
    this.materielleService.addMaterielle(this.ref,this.title,this.desc,this.prix,this.date,this.cat).then(() => {
      this.getMaterielle();
      this.  resetValues()
    });
  }
  getDistinctCategories(){
    this.materielleService.getDistinctCategories().then(data => {
      this.categoriesArray = data || [];
    });
  }
  downloadBarCode(ref :string){

    this.pdfService.downloadBarPdf(ref,this.height,this.width,this.perRow,this.chosenCat).subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      if (parseInt(ref) == 0) {link.download = 'AllBarCodes.pdf';}
      else{link.download = 'matrielle:' + ref +'.pdf';}
      link.click();
    });
  }
  calculateWidth(): number {
    return this.perRow * 200;
  }

  calculateHeight(): number {
    return Math.floor(this.numberOfBarCodes / this.perRow * 250);
  }

}
