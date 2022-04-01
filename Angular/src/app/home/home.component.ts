import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../Shared/Promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../Shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leader!: Leader;

  constructor(private dishService: DishService,
    private promotionService : PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish);

    this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);

    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader);
  }

}
