import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import {
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
} from 'firebase/storage';
@Injectable({
  providedIn: 'root',
})

export class ImageService {
  storage = getStorage();

  pathReference: StorageReference | undefined;
  constructor(private firebase: AngularFireDatabase) {}

  async getImage(pathName: any) {
    return await getDownloadURL(ref(this.storage, pathName));
  }
}
