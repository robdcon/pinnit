const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://cbumxnppdvzaauikhczt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidW14bnBwZHZ6YWF1aWtoY3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NDEzMDUsImV4cCI6MjAyMjAxNzMwNX0.AW2mqdrKqZMDEEw2kWodtb3IJvqCYApc-i9aeJoLWO8');

const client = {
  getUsers: async (args) => {
    let { data: Users, error } = await supabase
      .from('Users')
      .select('*')
    console.log('Users:', Users);
    
    return { Users, error }
  },

  addUser: async (args) => {
    const { username, email } = args;
    const { data, error } = await supabase
      .from('Users')
      .insert([
        { username, email },
      ])
      .select()

    return { data, error }
  },

  getUser: async (args) => {
    const { email } = args;

    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email)

    return { data, error }
  },

  getBoard: async (args) => {
    const {board} = args;

    const { data: Board, error } = await supabase
      .from('Boards')
      .select('*')
      .eq('id', board)

    return { Board, error }
  },

  addBoard: async (args) => {
   
    const { user, boardType } = args;
    const { data, error } = await supabase
      .from('Boards')
      .insert([
        { user: user, board_type: boardType },
      ])
      .select()

    return { data, error }
  },

  addUserBoardRef: async (args) => {
    console.log('User, board', args);
    
    const { user, board } = args;
    const { data, error } = await supabase
      .from('UserBoards')
      .insert([
        { user_id: user, board_id: board },
      ])
      .select()

    return { data, error }
  },

  getUserBoards: async (args) => {
    const { user } = args;

    let { data, error } = await supabase
      .from('UserBoards')
      .select('board_id')
      .eq('user_id', user)
    console.log(data, error);

    return { data, error }
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
    const { data, error } = await supabase
      .from('BoardNotes')
      .insert([
        { note_id: note, board_id: board },
      ])
      .select()

    return { data, error }
  },

  getBoardNotes: async (args) => {
    const { board } = args;
    let { data, error } = await supabase
      .from('BoardNotes')
      .select('Notes(id, text, level)')
      .eq('board_id', board)

    return { data, error }
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