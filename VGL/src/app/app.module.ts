import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PlayersService } from './services/players.service';
import { FilterPipe } from './filter/filter.pipe';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/playerComponents/home/home.component';

import { IndexComponent } from './components/adminComponents/index/index.component';
import { CreateComponent } from './components/adminComponents/create/create.component';
import { EditComponent } from './components/adminComponents/edit/edit.component';
import { AdminComponent } from './components/adminComponents/admin/admin.component';
import { GamesComponent } from './components/adminComponents/games/games.component';
import { PlayersComponent } from './components/playerComponents/players/players.component';
import { JoinComponent } from './components/playerComponents/join/join.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//auth0
import {AuthService} from "./services/auth.service";



const routes: Routes=[
  {path: '',  component: HomeComponent},
  {path: 'home',  component: HomeComponent},
  {path: 'index', component: IndexComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'games', component: GamesComponent},  
  {path: 'join/:id', component: JoinComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    AdminComponent,
    GamesComponent,
    PlayersComponent,
    JoinComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PlayersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
