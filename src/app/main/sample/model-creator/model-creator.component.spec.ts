import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCreatorComponent } from './model-creator.component';

describe('ModelCreatorComponent', () => {
  let component: ModelCreatorComponent;
  let fixture: ComponentFixture<ModelCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
