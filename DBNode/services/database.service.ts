import './database.config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export class DataBaseService {

    public getReference(collection, options?, documentId?, appName?) {
        let dbRef: any = firebase.app(appName).firestore();

        if (options !== undefined && options.parent !== undefined) {
            dbRef = dbRef.collection(options.parent.collection)
                .doc(options.parent.id);
        }

        dbRef = dbRef.collection(collection);

        if (documentId) {
            return dbRef.doc(documentId)
        } else {
            if (options !== undefined && options.where !== undefined) {
                options.where.forEach((whereClause) => {
                  dbRef = dbRef.where(whereClause.attribute, whereClause.operator, whereClause.value);
                });
            }

            if (options != undefined && options.orderBy != undefined) {
                options.orderBy.forEach((orderByClause) => {
                  dbRef = dbRef.orderBy(orderByClause.fieldPath, orderByClause.orderByClause);
                });
            }
        
            if (options != undefined && options.startAfter != undefined) {
                dbRef = dbRef.startAfter(options.startAfter);
            }

            if (options != undefined && options.limit != undefined) {
                dbRef = dbRef.limit(options.limit);
            }

            return dbRef;
        }
    }

    public get(doc, options?, appName?) {
        const dbRef = this.getReference(doc.collection, options, doc.id, appName);
        return dbRef.get().then((docRes) => {
            const resp: any = {
                id: docRes.id,
                data: docRes.data(),
                collection: docRes.collection
            };
            return resp;
        });
    }

    public getAll(collection, options?, appName?) {
        const dbRef = this.getReference(collection, options, undefined, appName);
        return dbRef.get().then((querySnapshot) => {
            const array: any = [];
            querySnapshot.forEach((doc) => {
                array.push({
                    id: doc.id,
                    data: doc.data(),
                    collection: collection
                });
            });
            return array;
        });
    }

    public getAllSnapshot(collection: string, options?, appName?) {
        return this.getReference(collection, options, undefined, appName);
    }

    public set(doc, options?, appName?) {
        const dbRef = this.getReference(doc.collection, options, doc.id, appName);
        return dbRef.set(Object.assign({}, doc.data));
    }

    public add(doc, options?, appName?) {
        const dbRef = this.getReference(doc.collection, options, appName);
        return dbRef.add(Object.assign({}, doc.data)).then((docResponse) => {
            doc.id = docResponse.id;
            return doc;
        });
    }

    public remove(doc, appName?) {
        const dbRef: any = firebase.app(appName).firestore();
        return dbRef.collection(doc.collection).doc(doc.id).delete();
    }
    
    public update(doc, options?, appName?) {
        const dbRef = this.getReference(doc.collection, options, doc.id, appName);
        return dbRef.update(doc.data);
    }

    public batchedSet(docs: any[], options?, appName?) {
        const batch = firebase.firestore(appName).batch();
        docs.forEach((document) => {
          const ref = firebase.firestore().collection(document.collection);
          const documentId = ref.doc().id;
          const dbRef = this.getReference(document.collection, options, documentId, appName);
          batch.set(dbRef, Object.assign(document.data));
        });
        return batch.commit();
    }

}
