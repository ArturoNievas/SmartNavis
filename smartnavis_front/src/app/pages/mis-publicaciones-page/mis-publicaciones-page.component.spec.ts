import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPublicacionesPageComponent } from './mis-publicaciones-page.component';

describe('MisPublicacionesPageComponent', () => {
  let component: MisPublicacionesPageComponent;
  let fixture: ComponentFixture<MisPublicacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisPublicacionesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisPublicacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
