import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getFirestore, setDoc, doc, getDoc, getDocs, collection } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Bebederos } from '../interfaces/bebederos';
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
}
