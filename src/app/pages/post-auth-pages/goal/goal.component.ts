import { Component, OnInit } from '@angular/core';

import { APP_ROUTES } from '../../../shared/routes/app-routes';

@Component({
	selector: 'app-goal',
	templateUrl: './goal.component.html',
	styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {
	goalSteps: any[] = [
		{ path: APP_ROUTES.slash + APP_ROUTES.goal, pathParam: "create", logo: "assets/img/set-goals.png", title: "Set your Goals", width: 42, height: 42 },
		{ path: APP_ROUTES.slash + APP_ROUTES.goal, pathParam: "pending", logo: "assets/img/pending-goals.png", title: "Pending Goals", width: 42, height: 42 },
		{ path: APP_ROUTES.slash + APP_ROUTES.goal, pathParam: "", logo: "assets/img/eye.png", title: "Accountability Checkpoint", width: 45, height: 34 },
		{ path: APP_ROUTES.slash + APP_ROUTES.goal, pathParam: "achieved", logo: "assets/img/achieved-goals.png", title: "Achieved Goals", width: 60, height: 43 },
		
	];

	constructor() { }

	ngOnInit(): void {
	}

}
