import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeChantierComponent } from './code-chantier.component';

describe('CodeChantierComponent', () => {
  let component: CodeChantierComponent;
  let fixture: ComponentFixture<CodeChantierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeChantierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
