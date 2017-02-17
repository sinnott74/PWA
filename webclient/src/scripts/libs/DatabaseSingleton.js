import idb from 'idb';

export default class DatabaseSingleton {

  static getDatabase() {
    if (typeof window.DatabaseInstance_ !== 'undefined') {
      return window.DatabaseInstance_;
    }

    window.DatabaseInstance_ = new Database()._dbPromise;

    return window.DatabaseInstance_;
  }
}

class Database {

  constructor() {
    this._dbPromise = this._openDatabase();
  }

  _openDatabase() {
    return idb.open('app-shell-db', 1, function(upgradeDb) {
      var keyValStore = upgradeDb.createObjectStore('keyval');
      keyValStore.put('world', 'hello');
    });
  }
}