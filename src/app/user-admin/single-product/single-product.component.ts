import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stores } from 'src/app/Interface/productmodel';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product: Stores | undefined

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.fetchProduct()

  }
  fetchProduct(): void {

    const id = this.activatedRoute.snapshot.params['id']
    console.log(id)

    this.adminService.getProduct(id).subscribe((product) => {
      console.log(product)
      this.product = product

    });
  }

}
