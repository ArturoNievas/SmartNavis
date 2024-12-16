import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarrasDisponiblesPageComponent } from './amarras-disponibles-page.component';

describe('AmarrasDisponiblesPageComponent', () => {
  let component: AmarrasDisponiblesPageComponent;
  let fixture: ComponentFixture<AmarrasDisponiblesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmarrasDisponiblesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmarrasDisponiblesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
