import { Component, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App Component';
  toState = 'state1';
  constructor(private renderer: Renderer2) {}

  bg1() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg.jpg")');
  }
  bg2() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg2.jpg")');
  }
  bg3() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg5.jpg")');
  }
  bg4() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg3-invert.jpg")');
  }
  bg5() {
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/backgrounds/bg6-invert.jpg")');
  }
}
