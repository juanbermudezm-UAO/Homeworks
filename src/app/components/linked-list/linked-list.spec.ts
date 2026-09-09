import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkedList } from './linked-list';

describe('LinkedList', () => {
  let component: LinkedList;
  let fixture: ComponentFixture<LinkedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedList],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
