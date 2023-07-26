import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPendingComponent } from './action-pending.component';

describe('ActionPendingComponent', () => {
  let component: ActionPendingComponent;
  let fixture: ComponentFixture<ActionPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
