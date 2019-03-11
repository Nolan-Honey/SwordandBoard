import { Component, Renderer2 } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App Component';
  toState = 'state1';
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private renderer: Renderer2,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  bg1() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg.jpg")');
    this.renderer.setStyle(document.body, 'color', 'white');
  }
  bg2() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg2.jpg")');
    this.renderer.setStyle(document.body, 'color', 'white');
  }
  bg3() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg5.jpg")');
    this.renderer.setStyle(document.body, 'color', 'black');

  }
  bg4() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg3-invert.jpg")');
    this.renderer.setStyle(document.body, 'color', 'white');
  }
  bg5() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg6-invert.jpg")');
    this.renderer.setStyle(document.body.getElementsByClassName('logo'), 'src', "../assets/images/backgrounds/sblogo.jpg");
  }
  onLogout() {
    this.authService.logout();
  }

  clickMethod() {
    if (confirm("Are you sure you want to navigate to https://www.theswordandboardtoronto.com? ")) {
      window.open("https://www.theswordandboardtoronto.com");
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
