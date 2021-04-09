import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Contacto } from '../domain/contacto';

@Injectable()
export class ProductService {


    contactNames: string[] = [
        "Andres", 
        "Ricardo",
        "Javier"
    
    ];

    constructor(private http: HttpClient) { }

   

    getProducts() {
        return this.http.get<any>('assets/showcase/data/contactos.json')
        .toPromise()
        .then(res => <Contacto[]>res.data)
        .then(data => { return data; });
    }

  

    generatePrduct(): Contacto {
        const product: Contacto =  {
            id: this.generateId(),
            nombre: this.generateNombre(),
            entidad: this.generateEntidad(),
            email: this.generateEmail()
          
        };

        return product;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    generateNombre() {
        return this.contactNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generateEntidad() {
        return this.contactNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generateEmail() {
        return this.contactNames[Math.floor(Math.random() * Math.floor(30))];
    }
}