import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BebederoPage } from './bebedero.page';

describe('BebederoPage', () => {
  let component: BebederoPage;
  let fixture: ComponentFixture<BebederoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BebederoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
