import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { AuthModule } from './auth/auth.module';
import { UserAdminModule } from './user-admin/user-admin.module';
import { CommonModule } from '@angular/common';
import { appInterceptProvider } from './app.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    UserAdminModule

  ],
  providers: [
    CartService,
    appInterceptProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
