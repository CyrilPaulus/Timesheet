import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrestationDialogComponent } from './add-prestation-dialog.component';

describe('AddPrestationDialogComponent', () => {
  let component: AddPrestationDialogComponent;
  let fixture: ComponentFixture<AddPrestationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrestationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrestationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
