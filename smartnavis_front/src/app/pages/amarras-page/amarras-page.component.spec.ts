import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarrasPageComponent } from './amarras-page.component';

describe('AmarrasPageComponent', () => {
  let component: AmarrasPageComponent;
  let fixture: ComponentFixture<AmarrasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmarrasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmarrasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
