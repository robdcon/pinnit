// require('dotenv').config();
// const { createClient } = require('@supabase/supabase-js');
// const supabase = createClient("https://cbumxnppdvzaauikhczt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidW14bnBwZHZ6YWF1aWtoY3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NDEzMDUsImV4cCI6MjAyMjAxNzMwNX0.AW2mqdrKqZMDEEw2kWodtb3IJvqCYApc-i9aeJoLWO8");
const { pgPool } = require('./postgres.js')

const client = {
  getUsers: async (args) => {
    const { rows: Users, error } = await pgPool.query('SELECT * FROM Users');
    if (error) {
      console.error('Error executing query', error.stack);
      return { error };
    }
    return { Users, error }
  },
  // PostgresSQL
  addUser: async (args) => {
      const { username, email } = args;
      const { rows } = await pgPool.query(`INSERT INTO public.users(username, email) VALUES ($1, $2) RETURNING *`, [username, email])
      const user = rows[0];
      return {
        data: [user]
      }
  },
  // PostgresSQL
  getUser: async (args) => {
    const { email } = args;
    const { rows } = await pgPool.query('SELECT * FROM public.users WHERE email = $1', [email]);
    const user = rows[0];
    return user
  },

  // PostgresSQL
  getBoard: async (args) => {
    const boardId = args;    
    const { rows } = await pgPool.query('SELECT id, name, board_type FROM public.boards WHERE "id" = $1', [boardId]);
    const board = rows[0];
    // Convert id to integer
    board.id = parseInt(board.id, 10);
    return board;
  },

  addBoard: async (args) => {
    let { name, boardType } = args;
    const { rows } = await pgPool.query(`INSERT INTO public.boards(name, board_type) VALUES ($1, $2) RETURNING *`, [name, board_type]);
    const res = rows[0];
    const data = [res];
    return data
  },

  addUserBoardRef: async (args) => {
    const { user, board } = args;
    const {rows} = await pgPool.query(`INSERT INTO public."user_boards"("user_id", "board_id") VALUES ($1, $2) RETURNING *`, [user, board]);
    const res = rows[0];
    return {
      data: [res]
    }
  },

  getUserBoards: async (args) => {
    const { user } = args;
    const req = await pgPool.query('SELECT id FROM users WHERE email = $1', [user]);
    const { id } = req.rows[0];
    const res = await pgPool.query('SELECT * FROM user_boards WHERE "user_id" = $1', [id]);
    const userBoards = res.rows;
    return {
      data: [...userBoards]
    }
  },

  createNote: async (args) => {
    const { json } = args;
    const {rows} = await pgPool.query(`INSERT INTO public.notes(content) VALUES ($1) RETURNING *`, [json]);
    const note = rows[0]
    
    return {
      data: [note]
    };
  },

  getNote: async (args) => {
    const id  = args;
    const { rows } = await pgPool.query('SELECT * FROM notes WHERE id = $1', [id]);
    const note = rows[0];
    note.content = JSON.stringify(note.content);
    return note
  },

  getItem: async (args) => {
    const id  = args;
    const { rows } = await pgPool.query('SELECT * FROM items WHERE id = $1', [id]);
    const item = rows[0];
    return item
  },

  addBoardNoteRef: async (args) => {
    const { note, board } = args;
    const {rows} = await pgPool.query(`INSERT INTO public."board_notes"("board_id", "note_id") VALUES ($1, $2) RETURNING *`, [board, note]);
    const res = rows[0];
    const data = [res];
    return data
  },

  getBoardNotes: async (args) => {
    const { board } = args;
    const {rows} = await pgPool.query('SELECT * FROM board_notes WHERE "board_id" = $1', [board]);
    const boardNotes = rows.map(note => note.note_id);
    return {
      data: 
        [...boardNotes] 
    }
  },
  getBoardItems: async (args) => {
    const { board } = args;
    const {rows} = await pgPool.query('SELECT * FROM board_items WHERE "board_id" = $1', [board]);
    const boardNotes = rows.map(item => item.item_id);
    return {
      data: 
        [...boardNotes] 
    }
  },

  updateNote: async (args) => {
    const { user, board, id, content, zindex, level } = args;
    const {rows} = await pgPool.query(`UPDATE public.notes SET content = $1 WHERE id = $2 RETURNING *`, [content, id]);
    const note = rows[0];
    note.content = JSON.stringify(note.content)
    return {
      data: [rows[0]]
    }

  },

  deleteNote: async (args) => {
    const { id } = args;
    const {rowCount: deletedRef} = await pgPool.query('DELETE FROM board_notes WHERE note_id = $1', [id]);
    return 'true'
  }
}

module.exports = client;