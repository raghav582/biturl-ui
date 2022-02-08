import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url, add_url } from '../constants/app.url';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    private http: HttpClient
  ) { }

  addUrl(url: any) {
    return this.http.post(base_url + add_url, url);
  }
}
