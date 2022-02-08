import { Component, OnInit } from '@angular/core';
import { ContactDetails } from '../forms/contactForm';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

   contactData: ContactDetails = new ContactDetails();
   contactForm: FormGroup;
   loading = false;

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private contactService: ContactService,
    private formbuilder: FormBuilder
  ) {
    this.contactForm = new FormGroup({});
    this.contactForm = this.formbuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      comments: ['']
    })
  }

  ngOnInit() {
  }

  saveContact() {
    this.loading = true;
    this.contactService.addContact(this.contactData).subscribe(
      (res: any) => {
        if (res['success']) {
          this._snackbar.open("Submission successful", "", { duration: 1000 });
        } else {
          this._snackbar.open("Submission failed", "", { duration: 1000 });
        }
        this.loading = false;
      }
    )
  }

}
