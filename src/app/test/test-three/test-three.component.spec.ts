import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThreeComponent } from './test-three.component';

describe('TestThreeComponent', () => {
  let component: TestThreeComponent;
  let fixture: ComponentFixture<TestThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
