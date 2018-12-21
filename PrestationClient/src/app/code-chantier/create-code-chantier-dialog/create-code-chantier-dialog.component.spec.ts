import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodeChantierDialogComponent } from './create-code-chantier-dialog.component';

describe('CreateCodeChantierDialogComponent', () => {
  let component: CreateCodeChantierDialogComponent;
  let fixture: ComponentFixture<CreateCodeChantierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCodeChantierDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCodeChantierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
