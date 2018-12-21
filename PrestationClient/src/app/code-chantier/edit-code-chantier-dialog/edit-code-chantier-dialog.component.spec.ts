import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCodeChantierDialogComponent } from './edit-code-chantier-dialog.component';

describe('EditCodeChantierDialogComponent', () => {
  let component: EditCodeChantierDialogComponent;
  let fixture: ComponentFixture<EditCodeChantierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCodeChantierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCodeChantierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
