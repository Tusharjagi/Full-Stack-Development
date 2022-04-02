import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../Shared/Promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../Shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut,expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  dishErrMess!: string;
  promotion!: Promotion;
  leader!: Leader;

  constructor(private dishService: DishService,
    private promotionService : PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);

    this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);

    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader);
  }

}
