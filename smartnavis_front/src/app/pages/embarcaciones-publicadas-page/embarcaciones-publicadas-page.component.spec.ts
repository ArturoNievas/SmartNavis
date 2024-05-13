import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarcacionesPublicadasPageComponent } from './embarcaciones-publicadas-page.component';

describe('EmbarcacionesPublicadasPageComponent', () => {
  let component: EmbarcacionesPublicadasPageComponent;
  let fixture: ComponentFixture<EmbarcacionesPublicadasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbarcacionesPublicadasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmbarcacionesPublicadasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
