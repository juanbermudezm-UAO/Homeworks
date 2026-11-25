import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatedGraph } from './related-graph';

describe('RelatedGraph', () => {
  let component: RelatedGraph;
  let fixture: ComponentFixture<RelatedGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedGraph],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
