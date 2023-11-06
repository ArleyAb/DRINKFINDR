import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacultadPage } from './facultad.page';

describe('FacultadPage', () => {
  let component: FacultadPage;
  let fixture: ComponentFixture<FacultadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FacultadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
