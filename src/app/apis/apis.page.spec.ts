import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APISPage } from './apis.page';

describe('APISPage', () => {
  let component: APISPage;
  let fixture: ComponentFixture<APISPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(APISPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
