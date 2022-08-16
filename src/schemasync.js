import { openDB } from 'idb';

export const SchemaSyncHandler = {
  sync() {
    openDB('Emodul', 1, upgaradeDB => {
      upgaradeDB.createObjectStore('emoduls', {keyPath: 'id'});
    });
  }
}