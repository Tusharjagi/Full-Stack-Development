import { Injectable } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DISHES } from '../Shared/dishes';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return of(DISHES).pipe(delay(2000)).toPromise();
  }

  getDish(id: string): Promise<Dish>{
      return new Promise(resolve => {
        setTimeout(() => resolve(DISHES.filter((dish) => (dish.id == id)) [0]),2000)
      });
        
  }

  getFeaturedDish (): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter ((dish) => dish.featured) [0]),2000)
    });
  }
  
}
