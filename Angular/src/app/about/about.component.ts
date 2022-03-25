import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'; 

import { Leader } from '../Shared/leader';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];


  constructor(private leaderService : LeaderService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .then(leaders =>this.leaders = leaders);
  }

}
