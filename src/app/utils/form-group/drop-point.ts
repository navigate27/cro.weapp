import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const DropPointFormGroup: FormGroup = new FormBuilder().group({
  company_name: [''],
  company_address: [''],
  company_contact_no: [''],
  email: [''],
  area: [''],
  drop_points: new FormBuilder().array([]),
});
