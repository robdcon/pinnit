const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://cbumxnppdvzaauikhczt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidW14bnBwZHZ6YWF1aWtoY3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NDEzMDUsImV4cCI6MjAyMjAxNzMwNX0.AW2mqdrKqZMDEEw2kWodtb3IJvqCYApc-i9aeJoLWO8');

const client = {
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

  addBoard: async (args) => {
    const { user } = args;
    const { data, error } = await supabase
      .from('Boards')
      .insert([
        { user: user },
      ])
      .select()

    return { data, error }
  },

  addUserBoardRef: async (args) => {
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
  }
}

module.exports = client;