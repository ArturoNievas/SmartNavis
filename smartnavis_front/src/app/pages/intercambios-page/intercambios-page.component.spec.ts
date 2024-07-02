import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercambiosPageComponent } from './intercambios-page.component';

describe('IntercambiosPageComponent', () => {
  let component: IntercambiosPageComponent;
  let fixture: ComponentFixture<IntercambiosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntercambiosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntercambiosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
