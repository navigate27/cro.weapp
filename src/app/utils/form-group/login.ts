import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const LoginFormGroup: FormGroup = new FormBuilder().group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
});
