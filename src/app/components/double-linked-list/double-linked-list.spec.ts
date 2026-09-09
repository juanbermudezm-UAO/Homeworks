import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoubleLinkedList } from './double-linked-list';

describe('DoubleLinkedList', () => {
  let component: DoubleLinkedList;
  let fixture: ComponentFixture<DoubleLinkedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubleLinkedList],
    }).compileComponents();

    fixture = TestBed.createComponent(DoubleLinkedList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
