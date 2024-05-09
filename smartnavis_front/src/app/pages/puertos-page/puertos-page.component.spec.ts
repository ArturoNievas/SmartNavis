import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuertosPageComponent } from './puertos-page.component';

describe('PuertosPageComponent', () => {
  let component: PuertosPageComponent;
  let fixture: ComponentFixture<PuertosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuertosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuertosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
