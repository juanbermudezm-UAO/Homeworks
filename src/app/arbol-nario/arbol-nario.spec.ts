import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArbolNario } from './arbol-nario';

describe('ArbolNario', () => {
  let component: ArbolNario;
  let fixture: ComponentFixture<ArbolNario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolNario],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbolNario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
