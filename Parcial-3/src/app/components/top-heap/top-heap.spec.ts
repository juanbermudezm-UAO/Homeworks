import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopHeap } from './top-heap';

describe('TopHeap', () => {
  let component: TopHeap;
  let fixture: ComponentFixture<TopHeap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopHeap],
    }).compileComponents();

    fixture = TestBed.createComponent(TopHeap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
