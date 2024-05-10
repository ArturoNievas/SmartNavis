import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarcacionesPageComponent } from './embarcaciones-page.component';

describe('EmbarcacionesPageComponent', () => {
  let component: EmbarcacionesPageComponent;
  let fixture: ComponentFixture<EmbarcacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbarcacionesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmbarcacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
