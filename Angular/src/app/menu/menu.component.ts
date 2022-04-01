import { Component, OnInit ,Inject} from '@angular/core';
import { Dish } from '../Shared/dish';
import { DishService } from '../services/dish.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes!: Dish[];
  errMess!: string;


  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL) { 
    }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe((dishes)=> this.dishes = dishes,
      errmess => this.errMess = <any>errmess );
  }

}
