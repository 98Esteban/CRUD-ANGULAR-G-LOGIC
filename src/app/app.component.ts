import { Component, OnInit } from '@angular/core';
import { Contacto } from './domain/contacto';
import { ProductService } from '../app/services/productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService,MessageService,ProductService]
})
export class AppComponent implements OnInit {

    contactoDialog: boolean;

    contactos: Contacto[];

    contacto: Contacto;

    selectedContactos: Contacto[];

    submitted: boolean;

    statuses: any[];

    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.contactos = data);
    }

    openNew() {
        this.contacto = {};
        this.submitted = false;
        this.contactoDialog = true;
    }

    editContacto(contacto: Contacto) {
        this.contacto = {...contacto};
        this.contactoDialog = true;
    }

    deleteContacto(contacto: Contacto) {
        this.confirmationService.confirm({
            message: 'Quiere borrar el contacto: ' + contacto.nombre + '?',
            header: 'Confirm',
            accept: () => {
                this.contactos = this.contactos.filter(val => val.id !== contacto.id);
                this.contacto = {};
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Producto Eliminado', life: 3000});
            }
        });
    }

    hideDialog() {
        this.contactoDialog = false;
        this.submitted = false;
    }
    
    saveContacto() {
        this.submitted = true;

        if (this.contacto.nombre.trim()) {
            if (this.contacto.id) {
                this.contactos[this.findIndexById(this.contacto.id)] = this.contacto;                
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contacto Actualizado', life: 3000});
            }
            else {
                this.contacto.id = this.createId();
                this.contactos.push(this.contacto);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contacto Creado', life: 3000});
            }

            this.contactos = [...this.contactos];
            this.contactoDialog = false;
            this.contacto = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.contactos.length; i++) {
            if (this.contactos[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}