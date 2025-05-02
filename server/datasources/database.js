require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient("https://cbumxnppdvzaauikhczt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidW14bnBwZHZ6YWF1aWtoY3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NDEzMDUsImV4cCI6MjAyMjAxNzMwNX0.AW2mqdrKqZMDEEw2kWodtb3IJvqCYApc-i9aeJoLWO8");
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
    const { board } = args;
    const { data: Board, error } = await pgPool.query('SELECT * FROM Boards WHERE "id" = $1', [board]);
    if (error) {
      console.error('Error executing query', error.stack);
      return { error };
    }
    return { Board, error }
  },

  addBoard: async (args) => {
    let { user, name, boardType } = args;
    const { rows } = await pgPool.query(`INSERT INTO public.boards("user", name, board_type) VALUES ($1, $2, $3) RETURNING *`, [user, name, boardType]);
    const res = rows[0];
    console.log('New Board:', res);
    const data = [res];
    return data
  },

  addUserBoardRef: async (args) => {
    const { user, board } = args;
    const rows = await pgPool.query(`INSERT INTO public."user_boards"("user_id", "board_id") VALUES ($1, $2) RETURNING *`, [user, board]);
    const res = rows[0];
    console.log('New UserBoard:', res);
    const data = [res];
    return data
  },

  getUserBoards: async (args) => {
    console.log('getUserBoards', args);

    const { user } = args;

    const rows = await pgPool.query('SELECT * FROM user_boards WHERE "user_id" = $1', [user]);
    const userBoards = rows[0];
    console.log('User Boards:', userBoards);
    return {
      data: {
        userBoards
      }
    }
  },

  createNote: async (args) => {
    const { text, board } = args;
    const { data, error } = await supabase
      .from('Notes')
      .insert([
        { board_id: board, text: text },
      ])
      .select()

    return { data, error }
  },

  addBoardNoteRef: async (args) => {
    const { note, board } = args;
    const rows = await pgPool.query(`INSERT INTO public."board_notes"("board_id", "note_id") VALUES ($1, $2) RETURNING *`, [note, board]);
    const res = rows[0];
    console.log('New BoardNote:', res);
    const data = [res];
    return data
  },

  getBoardNotes: async (args) => {
    const { board } = args;
    const rows = await pgPool.query('SELECT * FROM board_notes WHERE "board_id" = $1', [board]);
    const boardNotes = rows[0];
    console.log('Bard notes:', boardNotes);
    return {
      data: {
        boardNotes
      }
    }
  },

  updateNote: async (args) => {
    const { user, board, id, text, zindex, level } = args;
    const { data, error } = await supabase
      .from('Notes')
      .update({ text: text, level: level, zindex: zindex })
      .eq('id', id)
      .select()

    return { data, error }
  },

  deleteNote: async (args) => {
    const { id } = args;
    const { error } = await supabase
      .from('Notes')
      .delete()
      .eq('id', id)
    if (error) {
      return 'false';
    }
    return 'true';
  }
}

module.exports = client;