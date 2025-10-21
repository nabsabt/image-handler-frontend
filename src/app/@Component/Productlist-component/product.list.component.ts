import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  ImageProduct,
  ImageProductDetails,
} from '../../@Inteface/Product.interface';
import { FirebaseService } from '../../@Service/firebase.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'product-list',
  templateUrl: './product.list.component.html',
  styleUrl: './product.list.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    FileUploadModule,
    MatFormFieldModule,
    MatLabel,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [FirebaseService],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private getImgProductsSub: any;
  private firebaseService = inject(FirebaseService);

  public imgProducts = signal<Array<ImageProduct>>([]);

  /**
   * file uploader->
   */
  public URL = 'path_to_api';
  public uploader: FileUploader;
  response: string;

  public newProduct = signal<ImageProductDetails>({
    productID: 0,
    productImages: [],
    productThumbnailImage: '',
    defaultPrice: 0,
    productDescription: '',
    productName: '',
  });

  public firebaseConfig = {
    type: 'service_account',
    project_id: 'gorsium-app',
    private_key_id: '3c33aba9d8e7515c585de3d4c814a113986ef811',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGUXvX8uDt1iAC\nIroqCJa5iMPkP1zBb3kTx9PiVBOMtBnVDWmRXZjZ5vOC9bG87+Q+ZmJ/IBUDBOq6\ncRvEFr5DWj+CxxPNDxnsEjdkxCYivc9DX8xbzZtoAlf1nPRlbowcH4eeW1Fcfwaz\nacQBpJP3dwY24w1P/6Rp/EUWbU07Lnop8dwpOp3ZP47NKekQ1+8DWMPKvPjiycsD\nbmvAjrGjvqZO61tAEJyEb7eRThY3jI9kEnp+GwyFBBmx9PvyV3TrcB5e1utpt8sI\n6FFWahCNmtAEHxJWZDVJSHA2Ean9RsM/8kGDs+f3s8a5Xv2Df7lcUpUzB/DWTQ3Q\nmDrWwS5/AgMBAAECggEAGN8BNAzuroUrEHmAdWMMXApN3uMfY9byDUwDQ6Adr4iq\nsLB069kcIT+4jFT5zGMdccHvWlgQqodEVMt4mvfrNpEr49/JmO7q5lNGhSmgSr0Z\nMC7kdyLq+XlJxLDBabMaeTBvFqoHIx1/HqMGBNq5/8/6hImnEsBRw0Ty+SQOCnzJ\n225Qq8HBDhWmMakTdh1uvcZZFx5HRXp/QrNYZS8GGcBiAgEOd8+V5Zn6nbUO7BSW\nJX53fO2B88e1T8cTZR9pL77bdijHb0vKW+igLkfRwXeHao6pzozHm7BRqTLXDO+5\n9JZvIh9O/FOQHaopau0z7TZxnJZLMsfRz/YxIJ6RWQKBgQD6RN8DfHrixGagSUnA\n24x2+R0YP6oMEntWeoxh5+Jad3zL7T1Gzi76SmrtfkxibBsNKR4GOrzYMw12FH/C\n5hxJORTBwtPfk5e3rliSezIsu/3L53Gi7FS638RB/cgp7luxpMiO9/DdVcN+ukFi\n/eMK2n8RozcnnRP2kocQ1VjKJQKBgQDK3BERXFgr9uSSdxDOL7kEwdgIsMAvgfpl\ni/KbGeH3pqa3NEPiRUbXK9m8qNXjueQ/mobo1dqkSTDB2BCsgToCNB2HIAHALVyq\n/QbJstH5hQNer5DcnDh2kQNwDJpZ2PJkSuJRAZwSphhintSfcMFQxZdftdF6WyxN\nSjbheB6q0wKBgA1+1T/M4JuF17rg+Ncrf6GSwVzjYfoQrRH2vccxx+T0+IfOnTVK\nPQJGLQnte5T7G2JUS0gutqw55InvhQwveGsCZvoj1WUDAnVnM2OCvSvoX0E1k80j\nTVZeZqjgVIDeV5d2uVHsUNK+ozIcPRZndmzJZ3y9/mVmdQMg16OyvXz5AoGBAMbG\n4UqbrCJYaR1D4onHpYqNz3ykhY2H1a6PdYiZ0hxzhkVax3H+5C2P4GnHHt9olcnl\nR3D7rKTyuv4XFC+U6RyjqJNxv4VqbbV2/qHBwZK4zdaIPnCN+53i9vVixBRqSwoP\nfrhV1XNIofhxHnOlbygQlgXJCZzVnhGWOTSyGYrVAoGAT5h4FbZIC0ixD7oOLrxJ\ntUr29MZ+0lvj/JRztf7jAhABCfgVwgQuks9V+5g6pu3fkz+cH3ohcWykiRWHnJNU\nFhhwcUN/jJHXfYi/BVFigs/ZJIkDD+QThbg2bwjleuGNLNecWyUxGjWJNWK6F5dj\nwB6s6hvQScqw0MQD5uCel5k=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-fbsvc@gorsium-app.iam.gserviceaccount.com',
    client_id: '101378615902451771985',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40gorsium-app.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
  };

  /* public hasBaseDropZoneOver: boolean = false;
  public navbarClick = signal<Array<number>>([]);
  public navbarClickTimer = signal<number>(new Date().getTime());
  public fileUploaderAllowed = signal<boolean>(false); */

  constructor() {
    /**
     * File uploader logic
     */
    this.uploader = new FileUploader({
      url: this.URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
    });
    this.response = '';

    this.uploader.response.subscribe((res) => (this.response = res));
  }

  ngOnInit(): void {
    this.getImgProductsSub = this.firebaseService
      .getImageProductList()
      .subscribe({
        next: (res: Array<ImageProduct>) => {
          this.imgProducts.set(res);
        },
        error: (error: HttpErrorResponse): HttpErrorResponse => {
          return error;
        },
      });
  }

  public onUploadNewProduct() {}
  /* public onManageSecretClick() {
    const now = new Date().getTime();
    this.navbarClick().push(now);
    const numberOfClicks = this.navbarClick().length;

    if (this.navbarClick().length > 10) {
      this.navbarClick.set([]);
    }

    if (
      numberOfClicks > 1 &&
      this.navbarClick()[numberOfClicks - 1] -
        this.navbarClick()[numberOfClicks - 2] >
        500
    ) {
      this.navbarClick.set([]);
    } else if (this.navbarClick().length === 10) {
      this.fileUploaderAllowed.set(true);
    }
  } */
  ngOnDestroy(): void {
    this.getImgProductsSub?.unsubscribe();
  }
}
