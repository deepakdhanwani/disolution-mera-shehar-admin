import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment
} from "@angular/router";
import { Observable } from "rxjs";

import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { take, delay } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {

  constructor(private store: Store<fromRoot.State>) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromRoot.getAuthenticationStatus).pipe(take(1));
  }
}
