import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBindingPageComponent } from './data-binding-page.component';

describe('DataBindingPageComponent', () => {
  let component: DataBindingPageComponent;
  let fixture: ComponentFixture<DataBindingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataBindingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBindingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
