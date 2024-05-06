import pg from 'pg';

const Client = pg.Client;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'share-files',
  password: 'root',
  port: 5432,
})
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database is successfully...!");
});

export default client;