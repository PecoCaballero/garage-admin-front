import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { User, UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Garagem Admin';


  constructor(private rota: ActivatedRoute,
    private local: Location, ) { }

  ngOnInit(): void {
  }

}
