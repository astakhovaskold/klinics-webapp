/**
 * Created by ASTAKHOV A.A. on 15.02.2023
 */

db = new Mongo().getDB('chameleondb');

db.createUser({
    user: 'askold_astakhov',
    pwd: 'qTSGSqs8FvYzJLVd',
    roles: [
        {
            role: 'readWrite',
            db: 'chameleondb',
        },
    ],
});

db.createCollection('users', {capped: false});

db.users.insertOne({nickname: 'admin', password: '0000'});
