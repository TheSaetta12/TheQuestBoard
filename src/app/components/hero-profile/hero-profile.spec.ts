import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProfile } from './hero-profile';

describe('HeroProfile', () => {
  let component: HeroProfile;
  let fixture: ComponentFixture<HeroProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
