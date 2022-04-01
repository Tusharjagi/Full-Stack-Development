import { Injectable } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish>{
      return this.http.get<Dish>(baseURL + 'dishes/' + id);
        
  }

  getFeaturedDish (): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes));
  }

  getDishIds(): Observable<string[] | any > 
  {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));

  }
  // putDish(dish: Dish): Observable<Dish>{
  //   return of(dish)
  // }
  
}
