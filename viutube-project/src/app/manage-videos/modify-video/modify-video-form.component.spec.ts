import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyVideoFormComponent } from './modify-video-form.component';

describe('AddVideoFormComponent', () => {
  let component: ModifyVideoFormComponent;
  let fixture: ComponentFixture<ModifyVideoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyVideoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
