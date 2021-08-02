import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAComponent } from './system-a.component';

describe('SystemAComponent', () => {
	let component: SystemAComponent;
	let fixture: ComponentFixture<SystemAComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SystemAComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SystemAComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
