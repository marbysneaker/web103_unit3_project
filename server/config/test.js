import pkg from 'pg';
const { Client } = pkg;


const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
});

client.connect()
  .then(() => {
    console.log('Connected to the database!');
    client.end();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
    client.end();
  });
