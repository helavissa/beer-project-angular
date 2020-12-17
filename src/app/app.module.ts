import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerCardComponent } from './beer-card/beer-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    BeerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
