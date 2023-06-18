import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  constructor( private readonly ds:DataService,private readonly router:Router,private readonly active:ActivatedRoute) { }

  ngOnInit(): void {
  }
  allApiTopics(data:any){
    this.router.navigate(['/home', data]);
  }
}

