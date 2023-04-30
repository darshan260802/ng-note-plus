import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  CanActivate,
} from "@angular/router";
import { AuthService } from "../Shared/auth.service";
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
    ) {}

  async canActivate(
  ): Promise<boolean> {
    const result = await this.auth.tryAutoLogin()
    if (!result) {
      this.alertService
          .open("Please Login To Continue", {
            label: 'Auth Error',
            status: TuiNotification.Warning,
            autoClose: 4000,
            hasCloseButton: true,
            hasIcon: true,
          })
          .subscribe();
      this.router.navigate(["auth", "login"]);
      return false;
    }

    return true;
  }
}
