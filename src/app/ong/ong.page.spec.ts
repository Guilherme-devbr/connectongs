import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OngPage } from './ong.page';

describe('OngPage', () => {
  let component: OngPage;
  let fixture: ComponentFixture<OngPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
