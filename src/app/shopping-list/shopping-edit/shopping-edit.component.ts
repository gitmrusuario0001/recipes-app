import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput'  , {static: false})   nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f'  , {static: false})   slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editemItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
     this.subscription = this.slService.startedEditing.subscribe(
       (index: number) => {
         this.editedItemIndex = index;
         this.editMode = true;
         this.editemItem = this.slService.getIngredient(index);
         this.slForm.setValue({
           name: this.editemItem.name,
           amount: this.editemItem.amount
         });
       }
     );
  }

  onSubmit(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
     this.slService.deleteIngredient(this.editedItemIndex);
     this.onClear();
  }
}
