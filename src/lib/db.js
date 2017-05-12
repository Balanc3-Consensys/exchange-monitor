import mongoose from 'mongoose';
import config from 'config';

const db = config.db;

const uri = `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`;

export function connectdb() {
  mongoose.connect(uri);
}
