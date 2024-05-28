import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosLocosComponent } from './dados-locos.component';

describe('DadosLocosComponent', () => {
  let component: DadosLocosComponent;
  let fixture: ComponentFixture<DadosLocosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosLocosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosLocosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
