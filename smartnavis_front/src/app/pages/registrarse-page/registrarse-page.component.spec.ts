import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarsePageComponent } from './RegistrarsePageComponent';

describe('RegistrarsePageComponent', () => {
  let component: RegistrarsePageComponent;
  let fixture: ComponentFixture<RegistrarsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarsePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
