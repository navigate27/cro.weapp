import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const ServicePartnerFormGroup: FormGroup = new FormBuilder().group({
  company_name: ['', [Validators.required]],
  company_address: ['', [Validators.required]],
  company_contact_no: ['', [Validators.required]],
  contact_person: ['', [Validators.required]],
  contact_no: ['', [Validators.required]],
  email: ['', [Validators.required]],
  business_category: ['', [Validators.required]],
  area: ['', [Validators.required]],
  remarks: ['', [Validators.required]],
});
