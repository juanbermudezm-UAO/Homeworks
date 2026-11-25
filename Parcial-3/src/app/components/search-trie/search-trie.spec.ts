import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTrie } from './search-trie';

describe('SearchTrie', () => {
  let component: SearchTrie;
  let fixture: ComponentFixture<SearchTrie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTrie],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTrie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
