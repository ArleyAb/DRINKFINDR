import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getFirestore, setDoc, doc, getDoc, getDocs, collection } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Bebederos } from '../interfaces/bebederos';
import { Facultades } from '../interfaces/facultades';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor() { }

  async getListaBebederos(){
    const db = getFirestore(initializeApp(environment.firebaseConfig));
    const docs = await getDocs(collection(db, 'bebederos'));

    var bebederos:Bebederos[] = [];

    docs.forEach(async (doc) => {
      let data = doc.data();

      let bebedero: Bebederos = {
        'ID': doc.id,
        'Facultad': data['Facultad'],
        'Ubicacion': data['Ubicacion']
      };

      bebederos.push(bebedero);
    })

    return bebederos
  }

  async getListaFacultades(){
    const db = getFirestore(initializeApp(environment.firebaseConfig));
    const docs = await getDocs(collection(db, 'facultades'));
    let facultades :Facultades[] = []
    docs.forEach(async (doc)=>{
      let data = doc.data();

      let facultad:Facultades = {
        'ID' : doc.id,
        'nombre':data['nombre']
      };
      facultades.push(facultad);
    })
    return facultades;
  }
}
