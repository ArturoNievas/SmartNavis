import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmbarcacionFormComponent } from './crear-embarcacion-form.component';

describe('CrearEmbarcacionFormComponent', () => {
  let component: CrearEmbarcacionFormComponent;
  let fixture: ComponentFixture<CrearEmbarcacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEmbarcacionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEmbarcacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
