// pages/api/schools.js
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Only GET allowed' });
  try {
    const { q='', city='', page=1, limit=8, id } = req.query;

    if (id) {
      // fetch single by id
      const [rows] = await pool.query('SELECT id, name, address, city, state, contact, image, email_id FROM schools WHERE id = ?', [id]);
      return res.status(200).json(rows);
    }

    const pageNum = Math.max(1, parseInt(page || 1));
    const lim = Math.max(1, Math.min(100, parseInt(limit || 8)));
    const offset = (pageNum - 1) * lim;

    let where = 'WHERE 1=1';
    const params = [];
    if (q) { where += ' AND (name LIKE ? OR address LIKE ?)'; params.push('%'+q+'%', '%'+q+'%'); }
    if (city) { where += ' AND city LIKE ?'; params.push('%'+city+'%'); }

    const sql = `SELECT id, name, address, city, state, contact, image, email_id FROM schools ${where} ORDER BY id DESC LIMIT ? OFFSET ?`;
    params.push(lim, offset);
    const [rows] = await pool.query(sql, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
}
