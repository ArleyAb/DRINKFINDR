import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getFirestore, getDocs, collection, query, where, getDoc, setDoc, doc, Timestamp, onSnapshot,  } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Bebederos } from '../interfaces/bebederos';
import { Facultades } from '../interfaces/facultades';
import { ResenaToSend, Resenas } from '../interfaces/resenas';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor() { }

  async getListaBebederos(){
    const db = getFirestore(initializeApp(environment.firebaseConfig));
    const docs = await getDocs(collection(db, 'bebederos'));

    let bebederos:Bebederos[] = [];

    docs.forEach(async (doc) => {
      let data = doc.data();

      let bebedero: Bebederos = {
        'ID': doc.id,
        'Facultad': data['Facultad'],
        'Ubicacion': data['Ubicacion'],
        'Resenas': data['Resenas']
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

  getTime(fecha: Date){
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let periodo = ' am'
    let time;
    
    if (hora > 12){
      hora -= 12;
      periodo = ' pm';
    }

    if (hora < 10)
      time = '0' + hora.toString();
    else
      time = hora.toString();

    if (minutos < 10)
      time += ':0' + minutos.toString();
    else
      time += ':' + minutos.toString();

    if (hora == 12)
      periodo = ' pm';
    
    time += periodo;

    return time;
  }

  async getListaResenas(bebederoID: string){
    const db = getFirestore(initializeApp(environment.firebaseConfig));
    const q = query(collection(db, "resenas"), where("bebedero", "==", bebederoID));
    //const docs = await getDocs(q);
    let resenasList:Resenas[] = [];

    const docs = onSnapshot(q, (docs) => {
      resenasList.length = 0;

      docs.forEach((doc) => {
        let data = doc.data();
        let fecha = new Date(data['fecha'].toDate());

        let resena: Resenas = {
          'ID': doc.id,
          'bebedero': data['bebedero'],
          'autor': data['autor'],
          'fecha': fecha.toLocaleDateString(),
          'hora': this.getTime(fecha),
          'resena': data['resena']
        };

        resenasList.push(resena);
      });
    })

    return resenasList;
  }


  async getResena(resenaID: string){
    const db = getFirestore(initializeApp(environment.firebaseConfig));
    
    let result = await getDoc(doc(db, 'resenas', resenaID));
    let data = result.data();
    
    let resena: ResenaToSend = {
      'ID': result.id,
      'autor': '',
      'bebedero': '',
      'resena': ''
    };

    if (data){
      resena.autor = data['autor'];
      resena.bebedero = data['bebedero'];
      resena.resena = data['resena'];
    }

    return resena;
  }

  async updateResena(resena:ResenaToSend){
    const db = getFirestore(initializeApp(environment.firebaseConfig));

    return await setDoc(doc(db, 'resenas', resena.ID), {
      'bebedero': resena.bebedero,
      'autor': resena.autor,
      'fecha': Timestamp.fromDate(new Date()),
      'resena': resena.resena
    });
  }

  async postNewResena(resena:Resenas){
    const db = getFirestore(initializeApp(environment.firebaseConfig));

    // Save the resena
    await setDoc(doc(db, 'resenas', resena.ID), {
      'bebedero': resena.bebedero,
      'fecha': resena.fecha,
      'resena': resena.resena
    });

    // Update the bebedero's resenas count
    let bebedero_doc = doc(db, 'bebederos', resena.bebedero);
    // Get the old count
    let bebedero = await getDoc(bebedero_doc);
    // Save the new values
    await setDoc((bebedero_doc), {
      'Facultad': bebedero.get('Facultad'),
      'Ubicacion': bebedero.get('Ubicacion'),
      'Resenas': bebedero.get('Resenas') + 1
    })

    return resena;
  }
}
