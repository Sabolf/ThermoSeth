import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuVisible = false;

  toggleMenu(event: MouseEvent): void {
    this.menuVisible = !this.menuVisible;
    console.log('Menu Visible:', this.menuVisible);
  }
}
