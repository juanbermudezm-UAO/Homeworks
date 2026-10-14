import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArbolNArio } from './arbol-nario';

describe('ArbolNArio', () => {
  let component: ArbolNArio;
  let fixture: ComponentFixture<ArbolNArio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolNArio],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbolNArio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
