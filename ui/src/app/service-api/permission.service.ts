import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {ShareDataService} from "./share-data.service";

@Injectable()
export class PermissionsService {
    private isLoggedin?: boolean;

    constructor(private shareDataService: ShareDataService, private router: Router){
        this.shareDataService.isLogged$.subscribe((data: boolean) => {
            this.isLoggedin = data;
        });
    };
    canActivate(): boolean {
        if(!(this.isLoggedin == null ? false : this.isLoggedin)){
            this.router.navigate(['/unauthorized']);
        }
        return this.isLoggedin == null ? false : this.isLoggedin;
    }
}

export const canActivateTeam: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    return inject(PermissionsService).canActivate();
};
