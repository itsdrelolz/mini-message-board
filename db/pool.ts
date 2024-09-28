import { Pool } from 'pg';



const pool = new Pool({
  host: 'dpg-crrnfpl6l47c73clmt80-a.ohio-postgres.render.com',
  user: 'messageapp_0w4y_user',
  password: 'ZshV14ngbmJZc0675BKcKvdg1nH99mtr',
  database: 'messageapp_0w4y',
  port: 5432
});


// Export the pool instance
export default pool;
