import { Component, OnInit } from '@angular/core';
import { UrlService } from '../service/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlModel } from '../forms/urlForms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private urlData:UrlModel = new UrlModel();
  private shortUrl:any;
  private urlForm:FormGroup;
  private loading = false;

  constructor(
    private urlService:UrlService,
    private _snackbar: MatSnackBar,
    private formbuilder:FormBuilder
  ) {
    this.urlForm = new FormGroup({});
    this.urlForm = this.formbuilder.group({
      url: ['', Validators.required],
      shortUrl: ['', Validators.required]
    })
   }

  ngOnInit() {
  }

  onShort() {
    this.loading = true;
    this.urlService.addUrl(this.urlData).subscribe(
      (res) => {
        this.shortUrl = "https://bitrl.herokuapp.com/"+ res['url'];
        this._snackbar.open("Url has been shorten", "", {duration: 1000});
        this.loading = false;
      }
    )
  }

  onCopy() {
    var copyText = document.createElement('textarea');
    copyText.value = this.shortUrl;
    document.body.appendChild(copyText);
    copyText.focus();
    copyText.select();
    document.execCommand('copy');
    document.body.removeChild(copyText);
    this._snackbar.open("Url is copied", "", {duration: 500});
  }
}
