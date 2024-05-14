import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionEmbarcacionPageComponent } from './publicacion-embarcacion-page.component';

describe('PublicacionEmbarcacionPageComponent', () => {
  let component: PublicacionEmbarcacionPageComponent;
  let fixture: ComponentFixture<PublicacionEmbarcacionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionEmbarcacionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicacionEmbarcacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
