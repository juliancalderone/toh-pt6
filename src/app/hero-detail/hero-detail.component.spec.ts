import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;
  let location: Location;

  beforeEach(async () => {
    const heroServiceMock = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    heroServiceMock.getHero.and.returnValue(of([]));
    const locationMock = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: HeroService, useValue: heroServiceMock },
        { provide: Location, useValue: locationMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHero on initialization', () => {
    fixture.detectChanges();
    expect(heroService.getHero).toHaveBeenCalledWith(1);
  });

});
