import { Component, EventEmitter, Input, Output, } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalProducts: number = 0;
  @Input() itemsPerPage: number = 12;
  @Output() pageChanged = new EventEmitter<number>();

  totalPages: number = 0;
  currentPage: number = 1;

// Calculate total page 
  ngOnChanges() {
    this.calculateTotalPages();  
  }

  calculateTotalPages() {
    this.totalPages = Math.max(Math.ceil(this.totalProducts / this.itemsPerPage), 1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  goToNextPage() {
    console.log('Current Page:', this.currentPage, 'Total Pages:', this.totalPages);
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onPageChange(this.currentPage);
    }
  }
}