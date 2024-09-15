const api = require('./datasources/api');

const typeDefs =  {
    Query: {
        user: async (parent, args, context, info) => {
            const {email} = args;
            const response = await api.getUser(email, context).then(res => {
                console.log(res);
                
                return res;
            });
            return response;
        },

        users: async (parent, args, context, info) => {
            const response = await api.getUsers(context).then(res => {
                return res;
            });
            console.log("Resolver: ",response)
            return response;
        },

        checkUserExists: async (parent, {email, username}, context, info) => {
            const response = await api.checkUserExists(email, username, context).then(res => {
                console.log("UserExists res:", res)
                return res;
            })
            return response;
        },

        note: async (parent, {id}, context, info) => {
            const response = await api.getNote(id, context).then(res => {
                console.log("Resolver note: ", res)
                return res;
            });
            return response;
        },

        notes: async (parent, {user, board}, context, info) => {
            const response = await api.getNotes(user, board, context).then(res => {
                console.log("Notes: ", res)
                return res;
            });
            return response;
        },


        board: async (parent, {id, user}, context, info) => {
            const response = await api.getBoard(id, user, context).then(res => {
                return res;
            });
            return response;
        }, 

        boards: async (parent, { user }, context, info) => {
            const response = await api.getBoards(user, context).then(res => {
                return res;
            });
            return response;
        }, 

        email: async (parent, {email}, context, info) => {
            const response = await api.getEmail(email, context).then(res => {
                return res;
            })
            return response;
        },

        emails: async (parent, args, context, info) => {
            const response = await api.getEmails(context).then(res => {
                console.log("Emails:", res)
                return res;
            })
            return response;
        }
    },

    Mutation: {
        createUser: async (parent, {username, email}, context) => {
           const user = await api.createUser(username, email, context)
           .then(res => {
            console.log('resolver:createUser', res);
            return res
           });
           return user;
        }, 

        createNote: async (parent, {user, board, text, zindex, level }, context) => {
            const note = await api.createNote(user, board, text, zindex, level, context)
            .then(res => res);
            return note;
        },

        updateNote: async (parent, {user, board, id, text, zindex, level}, context) => {
            const note = await api.updateNote(user, board, id, text, zindex, level, context)
            .then(res => res);
            return note;
        },

        deleteNote: async (parent, {user, board, id}, context) => {
            const note = await api.deleteNote(user, board, id, context)
            .then(res => res);
            return note;
        },

        createBoard: async (parent, { user }, context) => {
            try {
                const board = await api.createBoard(user, context).then(res => res);
                console.log('Created Board:', board);
                return board;
            } catch (error) {
                console.log(error)
                return false
            }
        },
        shareBoard: async (parent, { user, board }, context) => {
            try {
                const result = await api.shareBoard(user, board, context).then(res => res);
                return result;
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
        name: () => (parent, args, context, info) => {
            return parent.name;
        }
    },

    UserEmail: {
        username: (parent, args, context, info) => {
            return parent.username;
        },
        email: (parent, args, context, info) => {
            return parent.email;
        }
    }
}

module.exports = typeDefs;