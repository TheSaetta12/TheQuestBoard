import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestCard } from './quest-card';

describe('QuestCard', () => {
  let component: QuestCard;
  let fixture: ComponentFixture<QuestCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestCard],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
