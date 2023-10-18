
# Werfen Challenge

Update the angular tutorial “Tour of Heroes” from Angular docs as follows (download from here):
- Add a new field “category” to Heroes (mutant, fast, flyer...)
- In the heroes.component add a new category selector to choose heroes of the selected category and assign a category for new heroes. (It will be valued use of reactive programing with rxjs).
- Add unit testing for heroes.component, hero-detail.component and hero- search.component
- http backend Heroes service will save only categoryId, the category name will be read from a new mock http backend service “categories” with the category data. The hero.service or the hero.component will add the category description to the hero object.

Example of InMemoryDataService (mock of the backend services response):

```
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice', categoryId: 1 },
      { id: 13, name: 'Bombasto', categoryId: 3 },
      { id: 14, name: 'Celeritas', categoryId: 2 },
      { id: 15, name: 'Magneta', categoryId: 4 },
      { id: 16, name: 'RubberMan', categoryId: 2 },
      { id: 17, name: 'Dynama', categoryId: 1 },
      { id: 18, name: 'Dr. IQ', categoryId: 3 },
      { id: 19, name: 'Magma', categoryId: 4 },
      { id: 20, name: 'Tornado', categoryId: 1 },
    ];
    const categories = [
      { id: 1, description: 'mutant'},
      { id: 2, description: 'flayer'},
      { id: 3, description: 'fire'},
      { id: 4, description: 'fast'},
    ]
    return {heroes, categories};
  }
```

