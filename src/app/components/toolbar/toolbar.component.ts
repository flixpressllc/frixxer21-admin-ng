import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faThList, faSignInAlt, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  faThList = faThList;
  faSignIn = faSignInAlt;
  faSignOut = faSignOutAlt;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.authService.signOut();
  }

  signIn(): void {
    this.authService.signIn();
  }

}
