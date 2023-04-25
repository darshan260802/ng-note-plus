import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Shared/auth.service';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mode: 'login' | 'signup' = 'login';
  userForm!: FormGroup;
  isLoading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private authProvider: AuthService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const { mode } = data;
      if (mode !== 'login' && mode !== 'signup') return;
      this.mode = mode;
    });

    this.userForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      remember: new FormControl(true),
    });
  }

  async handleSubmit() {
    if (this.mode === 'signup') {
      const user = {
        name: this.userForm.get('name')?.value as string,
        email: this.userForm.get('email')?.value as string,
        password: this.userForm.get('password')?.value as string,
      };

      if (Object.values(user).filter((data) => !data?.length).length) {
        Object.keys(user).forEach((key: string) => {
          // @ts-ignore
          if (!user[key]) {
            this.alertService
              .open(`${key} is required`, {
                label: 'Missing',
                status: TuiNotification.Warning,
                autoClose: 3500,
                hasCloseButton: true,
                hasIcon: true,
              })
              .subscribe();
          }
        });
        return;
      }

      this.isLoading = true;
      await this.authProvider
        .signup(user, this.userForm.get('remember')?.value as boolean)
        .then((res) => {
          res.subscribe((loadingStatus) => {
            this.isLoading = loadingStatus;
            if (loadingStatus === false) {
              // this.router.navigate(['/workspaces']);
            }
          });
        });

      // this.router.navigate(['/workspaces']);
    } else {
      const user = {
        email: this.userForm.get('email')?.value as string,
        password: this.userForm.get('password')?.value as string,
      };

      if (Object.values(user).filter((data) => !data?.length).length) {
        Object.keys(user).forEach((key: string) => {
          // @ts-ignore
          if (!user[key]) {
            this.alertService
              .open(`${key} is required`, {
                label: 'Missing',
                status: TuiNotification.Warning,
                autoClose: 3500,
                hasCloseButton: true,
                hasIcon: true,
              })
              .subscribe();
          }
        });
        return;
      }

      this.isLoading = true;
      await this.authProvider
        .login(user, this.userForm.get('remember')?.value as boolean)
        .then((res) => {
          res.subscribe((loadingStatus) => {
            this.isLoading = loadingStatus;
            if (loadingStatus === false) {
              // this.router.navigate(['/workspaces']);
            }
          });
        });
    }
  }
}
