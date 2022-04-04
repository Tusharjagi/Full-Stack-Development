import { Component, Inject, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'; 

import { Leader } from '../Shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];
  leaderErr!: string;


  constructor(private leaderService : LeaderService,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('BaseURL') public BaseURL ) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .subscribe(leaders =>this.leaders = leaders,
        LeadError => this.leaderErr = <any> LeadError );
  }

}
