import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const VIPFormGroup: FormGroup = new FormBuilder().group({
  name: [''],
  email: [''],
  mobile_number: [''],
  referral_id: ['', [Validators.required]],
  company_name: ['', [Validators.required]],
  company_address: ['', [Validators.required]],
  company_contact_no: ['', [Validators.required]],
  business_category: ['', [Validators.required]],
  parcel_monthly: ['', [Validators.required, Validators.min(1)]],
  platform: ['', [Validators.required]],
  user_id: ['', [Validators.required]],
});
