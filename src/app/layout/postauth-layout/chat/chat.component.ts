import { Component, HostListener, OnInit } from '@angular/core';


@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	chat: any[] = [];
	ddHeight!: number;

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.ddHeight = window.innerHeight - 150;
	}

	constructor() {
		this.onResize();
	}

	ngOnInit(): void {
		this.getChat();

	}

	private getChat(): void {
		this.chat = [
			{ img: "assets/img/avatar.png", name: "Joy added", description: "Meditate & Motivate", time: "5h ago" },
			{ img: "assets/img/avatar.png", name: "Joy added", description: "Meditate & Motivate", time: "5h ago" },
			{ img: "assets/img/avatar.png", name: "Joy added", description: "Meditate & Motivate", time: "5h ago" },
			{ img: "assets/img/avatar.png", name: "Joy added", description: "Meditate & Motivate", time: "5h ago" },
			{ img: "assets/img/avatar.png", name: "Joy added", description: "Meditate & Motivate", time: "5h ago" },
			{ img: "assets/img/avatar.png", name: "Joy added", description: "Meditate & Motivate", time: "5h ago" },
			{ img: "assets/img/avatar.png", name: "Joy added", description: "Meditate & Motivate", time: "5h ago" },
			{ img: "assets/img/avatar.png", name: "Joy added", description: "Meditate & Motivate", time: "5h ago" },
		];
	}
}