import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollLoadComponent } from './scroll-load.component';

describe('ScrollLoadComponent', () => {
	let component: ScrollLoadComponent;
	let fixture: ComponentFixture<ScrollLoadComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ScrollLoadComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ScrollLoadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
