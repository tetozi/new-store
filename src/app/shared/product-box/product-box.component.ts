import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../Interface/store.model';

@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
  
})
export class ProductBoxComponent implements OnChanges {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor(private cdr : ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fullWidthMode']) {
      console.log('Full Width Mode in ngOnChanges:', changes['fullWidthMode'].currentValue);
    }
  }
  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}