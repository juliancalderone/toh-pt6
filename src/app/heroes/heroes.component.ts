import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Category } from '../category';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  heroForm: FormGroup;

  constructor(
    private heroService: HeroService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {
    this.heroForm = this.formBuilder.group({
      category: ['']
    });
  }

  ngOnInit(): void {
    this.getHeroesWithCategories();
    this.getCategories();
    this.heroForm.get('category')?.valueChanges
      .pipe(
        switchMap(category => this.filterHeroesByCategory(category))
      )
      .subscribe(heroes => {
        this.heroes = heroes;
      })
  }


  getHeroesWithCategories(): void {
    this.heroService.getHeroesWithCategories().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  getCategories(): void {
    this.categoriesService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  private filterHeroesByCategory(category: string): Observable<Hero[]> {
    return this.heroService.getHeroesWithCategories()
      .pipe(
        map(heroes => {
          if (category === '') {
            return heroes;
          } else {
            return heroes.filter(hero => hero.categoryDescription === category);
          }
        })
      );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const category = this.heroForm.get('category')?.value;
    const categoryId = this.categories.find(cat => cat.description === category)?.id;
    this.heroService.addHero({ name, categoryDescription: category, categoryId } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
