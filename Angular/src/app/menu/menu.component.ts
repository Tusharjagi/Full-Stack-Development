import { Component, OnInit } from '@angular/core';
import { Dish } from '../Shared/dish';

import { DishService } from '../services/dish.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes!: Dish[];

  selectedDish!: Dish ;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishes = this.dishService.getDishes();
  }

  onSelect(dish:Dish){
    this.selectedDish = dish;
  }

}
