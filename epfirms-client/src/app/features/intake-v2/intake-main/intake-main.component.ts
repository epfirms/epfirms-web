import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientMatterService } from '@app/client-portal/_services/matter-service/client-matter.service';
import { Matter } from '@app/core/interfaces/matter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-intake-main',
  templateUrl: './intake-main.component.html',
  styleUrls: ['./intake-main.component.scss']
})
export class IntakeMainComponent implements OnInit, OnDestroy {

  matters$ : Observable<Matter[]>


  constructor(
    private clientMatterService : ClientMatterService
  ) {

      this.matters$ = this.clientMatterService.entities$;
   }

  ngOnInit(): void {
  }



  ngOnDestroy(): void {
    
  }

  
}
