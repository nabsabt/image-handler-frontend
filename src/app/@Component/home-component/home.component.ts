import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../@Inteface/Product.interface';
import { FirebaseService } from '../../@Service/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { THREEComponent } from '../THREE-component/THREE.component';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    THREEComponent,
  ],
  providers: [FirebaseService],
})
export class HomeComponent {
  private getProductsSub: Subscription;

  private firebaseService = inject(FirebaseService);

  public products = signal<Array<Product>>([]);
  public productCardBoxSize = { width: 300, height: 300 };

  constructor() {
    console.log(new Date().getTime());
  }

  ngOnInit(): void {
    this.getProductsSub = this.firebaseService.getProducts().subscribe({
      next: (res: Array<Product>) => {
        this.products.set(res);
        console.log(this.products());
      },
      error: (error: HttpErrorResponse): HttpErrorResponse => {
        return error;
      },
    });
  }

  ngOnDestroy(): void {
    this.getProductsSub?.unsubscribe();
  }
}
