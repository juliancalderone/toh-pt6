import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { CategoriesService } from '../categories.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let categoriesService: jasmine.SpyObj<CategoriesService>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroesWithCategories', 'addHero', 'deleteHero']);
    const categoriesServiceSpy = jasmine.createSpyObj('CategoriesService', ['getCategories']);

    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: CategoriesService, useValue: categoriesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    categoriesService = TestBed.inject(CategoriesService) as jasmine.SpyObj<CategoriesService>;

    heroService.getHeroesWithCategories.and.returnValue(of([]));
    categoriesService.getCategories.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve heroes with categories on initialization', () => {
    heroService.getHeroesWithCategories.and.returnValue(of([{ id: 1, name: 'Hero 1', categoryId: 1, categoryDescription: 'Mutant' }]));

    component.ngOnInit();

    expect(heroService.getHeroesWithCategories).toHaveBeenCalled();
    expect(component.heroes.length).toBe(1);
  });

  it('should retrieve categories on initialization', () => {
    categoriesService.getCategories.and.returnValue(of([{ id: 1, description: 'Mutant' }]));

    component.ngOnInit();

    expect(categoriesService.getCategories).toHaveBeenCalled();
    expect(component.categories.length).toBe(1);
  });

  it('should add a hero', () => {
    const hero: Hero = { id: 1, name: 'Hero 1', categoryId: 1, categoryDescription: 'Mutant' };
    const addHeroSpy = heroService.addHero.and.returnValue(of(hero));

    component.add('Hero 1');

    expect(addHeroSpy).toHaveBeenCalled();
    expect(component.heroes.length).toBe(1);
  });

  it('should delete a hero', () => {
    const hero: Hero = { id: 1, name: 'Hero 1', categoryId: 1, categoryDescription: 'Mutant' };
    const deleteHeroSpy = heroService.deleteHero.and.returnValue(of(hero));

    component.delete(hero);

    expect(deleteHeroSpy).toHaveBeenCalledWith(hero.id);
    expect(component.heroes.length).toBe(0);
  });
});
