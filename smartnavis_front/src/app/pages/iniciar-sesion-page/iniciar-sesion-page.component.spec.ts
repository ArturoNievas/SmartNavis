import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionPageComponent } from './iniciar-sesion-page.component';

describe('IniciarSesionPageComponent', () => {
  let component: IniciarSesionPageComponent;
  let fixture: ComponentFixture<IniciarSesionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IniciarSesionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
