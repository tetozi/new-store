import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-product',
  templateUrl: './header-product.component.html',
  styleUrls: ['./header-product.component.css']
})
export class HeaderProductComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  itemsShowCount = 12;
  sort = 'desc';
 
  constructor() {}

  onColumnsUpdated(cols: number): void {
    console.log('Emitting Columns Count:', cols);
    this.columnsCountChange.emit(cols);
  }
 // Send  the limit of the products for page
  onItemsUpdated(limit: number) {
    this.itemsCountChange.emit(limit); 
  }

  onSortUpdated(newSort: string): void {
    this.sortChange.emit(newSort);
    this.sort = newSort;
  }
}
