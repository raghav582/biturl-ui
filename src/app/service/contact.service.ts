import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url, add_contact } from '../constants/app.url';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  addContact(model) {
    return this.http.post(base_url + add_contact, model);
  }
}
