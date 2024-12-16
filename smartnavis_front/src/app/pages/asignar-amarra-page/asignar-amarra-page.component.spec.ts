import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAmarraPageComponent } from './asignar-amarra-page.component';

describe('AsignarAmarraPageComponent', () => {
  let component: AsignarAmarraPageComponent;
  let fixture: ComponentFixture<AsignarAmarraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarAmarraPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarAmarraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
