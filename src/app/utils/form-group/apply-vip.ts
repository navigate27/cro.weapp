import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const ApplyVIPFormGroup: FormGroup = new FormBuilder().group({
  referral_id: ['', [Validators.required]],
  email: ['', [Validators.required, , Validators.email]],
  company_name: ['', [Validators.required]],
  company_address: ['', [Validators.required]],
  company_phone: ['', [Validators.required]],
  business_category: ['', [Validators.required]],
  parcel_mon: ['', [Validators.required]],
  platform: ['', [Validators.required]],
});
