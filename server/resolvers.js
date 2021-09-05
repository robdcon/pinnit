const api = require('./datasources/api');

const typeDefs =  {
    Query: {
        user: async (parent, {id}, context, info) => {
            const response = await api.getUser(id, context).then(res => {
                return res;
            });
            return response;
        },

        users: async (parent, args, context, info) => {
            const response = await api.getUsers(context).then(res => {
                console.log("Resolver: ",res)
                return res;
            });
            return response;
        },

        note: async (parent, {id}, context, info) => {
            const response = await api.getNote(id, context).then(res => {
                console.log("Resolver note: ",res)
                return res;
            });
            return response;
        },

        notes: async (parent, args, context, info) => {
            const response = await api.getNotes(context).then(res => {
                console.log("Notes: ", res)
                return res;
            });
            return response;
        },


        board: async (parent, {id}, context, info) => {
            const response = await api.getBoard(id, context).then(res => {
                return res;
            });
            return response;
        }
    },

    Mutation: {
        createUser: async (parent, {username, email}, context) => {
           const user = await api.createUser(username, email, context)
           .then(res => res);
           return user;
        }, 

        createNote: async (parent, {text, zindex, level }, context) => {
            const note = await api.createNote(text, zindex, level, context)
            .then(res => res);
            return note;
        },

        updateNote: async (parent, {id, text, zindex, level}, context) => {
            const note = await api.updateNote(id, text, zindex, level, context)
            .then(res => res);
            return note;
        },

        createBoard: async (parent, {id, notes, users }, {hmset}) => {
            try {
                await hmset(`boards:${id}`, 'notes', notes, 'users', users );
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    },
    
    User: {
        id: (parent, args, context, info) => {
            return parent.id;
        },
        username: (parent, args, context, info) => {
            return parent.username;
        },
        email: (parent, args, context, info) => {
            return parent.email;
        },
        boards: (parent, args, context, info) => {
            return parent.boards;
        }
    },

    Note: {
        id: (parent, args, context, info) => {
            return parent.id;
        },
        text: (parent, args, context, info) => {
            return parent.text;
        },
        zindex: (parent, args, context, info) => {
            return parent.zindex;
        },
        level: (parent, args, context, info) => {
            return parent.level;
        }
    },

    Board: {
        id: () => (parent, args, context, info) => {
            return parent.id;
        },
        notes: () => (parent, args, context, info) => {
            return parent.notes;
        },
        users: () => (parent, args, context, info) => {
            return parent.users;
        }
    }
}

module.exports = typeDefs;