import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPublicacionesPageComponent } from './usuario-publicaciones-page.component';

describe('UsuarioPublicacionesPageComponent', () => {
  let component: UsuarioPublicacionesPageComponent;
  let fixture: ComponentFixture<UsuarioPublicacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioPublicacionesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioPublicacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
