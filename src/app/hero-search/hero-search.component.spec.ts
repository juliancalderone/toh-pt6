import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService: HeroService;
  let searchHeroesSpy: jasmine.Spy;

  beforeEach(async () => {
    const heroServiceMock = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    searchHeroesSpy = heroServiceMock.searchHeroes.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      providers: [{ provide: HeroService, useValue: heroServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set heroes$ observable with the result of searchHeroes method', () => {
    const heroes: Hero[] = [{ id: 1, name: 'Hero 1', categoryId: 1, categoryDescription: 'mutant' }, { id: 2, name: 'Hero 2', categoryId: 2, categoryDescription: 'flayer' }];
    searchHeroesSpy.and.returnValue(of(heroes));

    component.search('term');
    component.heroes$.subscribe((result) => {
      expect(result).toEqual(heroes);
    });
  });
});
