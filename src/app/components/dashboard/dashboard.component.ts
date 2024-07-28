import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  activeItem: string = 'notes';
  isSidenavCollapsed = false;
  hasClicked = false;
  isExpanded = false;
  
  expandForm() {
    this.isExpanded = true;
  }

  collapseForm() {
    this.isExpanded = false;
  }
  setActive(item: string) {
    this.activeItem = item;
  }
  toggleSidenav() {
    if (this.hasClicked) {
      this.isSidenavCollapsed = !this.isSidenavCollapsed;
    } else {
      this.hasClicked = true;
    }
  }
}
