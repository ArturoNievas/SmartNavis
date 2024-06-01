import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEmbarcacionesPageComponent } from './usuario-embarcaciones-page.component';

describe('UsuarioEmbarcacionesPageComponent', () => {
  let component: UsuarioEmbarcacionesPageComponent;
  let fixture: ComponentFixture<UsuarioEmbarcacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEmbarcacionesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioEmbarcacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
