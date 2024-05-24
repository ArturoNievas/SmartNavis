import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarContrasenaPageComponent } from './cambiar-contrasena-page.component';

describe('CambiarContrasenaPageComponent', () => {
  let component: CambiarContrasenaPageComponent;
  let fixture: ComponentFixture<CambiarContrasenaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarContrasenaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambiarContrasenaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
