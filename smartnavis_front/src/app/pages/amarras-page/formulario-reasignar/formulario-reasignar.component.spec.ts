import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReasignarComponent } from './formulario-reasignar.component';

describe('FormularioReasignarComponent', () => {
  let component: FormularioReasignarComponent;
  let fixture: ComponentFixture<FormularioReasignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReasignarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioReasignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
