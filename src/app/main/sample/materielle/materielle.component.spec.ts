import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielleComponent } from './materielle.component';

describe('MaterielleComponent', () => {
  let component: MaterielleComponent;
  let fixture: ComponentFixture<MaterielleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
