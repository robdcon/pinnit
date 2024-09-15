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
      .eq('email', email )

    return { data, error }
  }
}

module.exports = client;