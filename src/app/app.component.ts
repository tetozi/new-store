import { Component, OnInit } from '@angular/core';
import { Cart } from './Interface/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };
  title = 'new-store'
  constructor(private cartService: CartService) {}

  ngOnInit(): void {

    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
