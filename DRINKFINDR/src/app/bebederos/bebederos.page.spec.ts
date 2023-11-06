import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BebederosPage } from './bebederos.page';

describe('BebederosPage', () => {
  let component: BebederosPage;
  let fixture: ComponentFixture<BebederosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BebederosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
