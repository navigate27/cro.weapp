import { FormBuilder, FormGroup } from '@angular/forms';

export const ParcelDetailsFormGroup: FormGroup = new FormBuilder().group({
  item_details: [''],
  length: [''],
  width: [''],
  height: [''],
  weight: [''],
  item_qty: [''],
  item_value: [''],
});
