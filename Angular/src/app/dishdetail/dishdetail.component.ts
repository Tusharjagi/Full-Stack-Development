import { Component, OnInit} from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../Shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../Shared/comment';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish!: Dish;
  dishIds! : string[];
  prev!: string;
  next!: string;
  errMsg!: string;

  commentForm!: FormGroup;
  comment!: Comment;
  dishcopy!: Dish;
  visibility!: 'shown';
  n!: string;
  d!: Date;

  formErrors : any = {
    'author' : '',
    'comment': '',
  };

  validationMessages: any = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 1 characters long.'
    }
  };
  commentFormDirective: any;
 

  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) { 
                this.createForm();
              }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errMsg => this.errMsg = <any>errMsg);
  }

  createForm()
  {
    this.commentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['',[Validators.required, Validators.minLength(1)]],
      rating!:5
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  onValueChanged(data?: any){
      if(!this.commentForm)
      {return;}

      const form = this.commentForm;
      for(const field in this.formErrors)
      {
        if(this.formErrors.hasOwnProperty(field))
        {
          this.formErrors[field] = '';
          const control = form.get(field);
          if(control && control.dirty && !control.valid)
          {
            const message = this.validationMessages[field];
            for(const key in control.errors)
            {
              if(control.errors.hasOwnProperty(key))
              {
                this.formErrors[field] += message[key] + ' ';
              }
            }
          }
        }
      }
  }

  onSubmit()
  {
    this.d = new Date();
    this.n = this.d.toISOString();

    this.commentForm.value.date = this.n;
    this.comment = this.commentForm.value;

    console.log(this.comment);

    this.dish.comments.push(this.comment);

    // this.commentForm.reset({
    //   author:'',
    //   rating:'',
    //   comment:'',
    //   date: ''
    // });
    
    this.commentFormDirective.resetForm();
    
  }

  
  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  formatLabel(value: number) {
    if (value >= 5) {
      return Math.round(value / 5) ;
    }

    return value;
  }

}
