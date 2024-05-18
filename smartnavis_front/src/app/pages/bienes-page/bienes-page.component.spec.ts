import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienesPageComponent } from './bienes-page.component';

describe('BienesPageComponent', () => {
  let component: BienesPageComponent;
  let fixture: ComponentFixture<BienesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BienesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
