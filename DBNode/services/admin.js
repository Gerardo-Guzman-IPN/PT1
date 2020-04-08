const admin =  require('firebase-admin');

const serviceAccount = require('../utils/sdse-upiita-firebase-adminsdk-1fki6-a404d8db23.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sdse-upiita.firebaseio.com"
});

let db = admin.firestore();
let store = admin.storage();

const getReference = (collection, options, docId, appName) => {
    let dbRef = db;
    if (options !== undefined && options.parent !== undefined) {
        dbRef = dbRef.collection(options.parent.collection)
                        .doc(options.parent.id);
    }

    dbRef = dbRef.collection(collection);

    if (docId) {
        return dbRef.doc(docId);
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
};

const get = (doc, options, appName) => {
    const dbRef = getReference(doc.collection, options, doc.id, appName);
    return dbRef.get().then((docRes) => {
        const resp = {
            id: docRes.id,
            data: docRes.data(),
            collection: docRes.collection
        }
        return resp;
    });
}

const getAll = (collection, options, appName) => {
    const dbRef = getReference(collection, options, undefined, appName);
    return dbRef.get().then((querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
            array.push({
                id: doc.id,
                data: doc.data(),
                collection: collection
            });
        });
        return array;
    })
}

const getAllSnapshots = (collection, options, appName) => {
    return getReference(collection, options, undefined, appName);
}

const set = (doc, options, appName) => {
    const dbRef = getReference(doc, options, doc.id, appName);
    return dbRef.set(Object.assign({}, doc.data));
}

const add = (doc, options, appName) => {
    const dbRef = getReference(doc, options, doc.id, appName);
    return dbRef.add(Object.assign({}, doc.data)).then((docRes) => {
        let doc2 = doc;
        doc2.id = docRes.id;
        return doc2;
    })
}

const remove = (doc, appName) => {
    return db.collection(doc.collection).doc(doc.id).delete();
}

const update = (doc, options, appName) => {
    const dbRef = getReference(doc.collection, options, doc.id, appName);
    return dbRef.update(doc.data);
}

const batchedSet = (docs) => {
    const batch = db.batch();
    docs.forEach((document) => {
        const ref = db.collection(document.collection);
        const docId = ref.doc();
        batch.set(docId, Object.assign({}, document.data));
    });
    return batch.commit();
}

module.exports = {
    get,
    getAll,
    getAllSnapshots,
    set,
    add,
    remove,
    update,
    batchedSet
}
