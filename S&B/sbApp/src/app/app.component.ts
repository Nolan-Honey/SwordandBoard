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
}
