/**
 * Created by ASTAKHOV A.A. on 15.02.2023
 */

db = new Mongo().getDB('medicindb');

db.createUser({
    user: 'askold_astakhov',
    pwd: 'qTSGSqs8FvYzJLVd',
    roles: [
        {
            role: 'readWrite',
            db: 'medicindb',
        },
    ],
});

db.createCollection('users', {capped: false});

db.users.insertOne({
    username: 'admin',
    password: '$2y$10$n7YDQKIXusjRD5jY2O8dq.lzV0tsMoxl9oU/NfrQtGOfzfqOwg8TC',
    role: 'ADMIN',
    is_active: true,
});
