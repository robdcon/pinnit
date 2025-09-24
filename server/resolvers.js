const api = require('./datasources/api');

const resolvers =  {
    Query: {
        user: async (parent, args, context, info) => {
            const {email} = args;
            const response = await api.getUser(email, context).then(res => {
                return res;
            });
            return response;
        },

        users: async (parent, args, context, info) => {
            const response = await api.getUsers(context).then(res => {
                return res;
            });
            return response;
        },

        note: async (parent, {id}, context, info) => {
            const response = await api.getNote(id, context);
            return response;
        },

        item: async (parent, {id}, context, info) => {
            const response = await api.getItem(id, context);
            return response;
        },

        notes: async (parent, {board}, context, info) => {
            const response = await api.getNotes(board, context)
            .then(res => {
                return res;
            });
            console.log(response);
            
            return response;
        },

        items: async (parent, {board}, context, info) => {
            const response = await api.getItems(board, context)
            return response;
        },

        board: async (parent, { board }, context, info) => {  
            console.log(context);
            
            const response = await api.getBoard(board, context).then(res => {
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
            const response = await api.getEmails(context);
            return response;
        }
    },

    Mutation: {
        createUser: async (parent, {username, email}, context) => {
           const user = await api.createUser(username, email, context);
           return user;
        }, 

        createNote: async (parent, {board, content}, context) => {
            const note = await api.createNote(board, content, context)
            .then(res => {
                res.content = JSON.stringify(res.content);
                return res;
            });
            return note;
        },

        updateNote: async (parent, args, context, info) => {
            const note = await api.updateNote(args, context)
            .then(res => {
                return res;
            });
            return note;
        },

        deleteNote: async (parent, args, context) => {
            const res = await api.deleteNote(args, context)
            .then(res => res);
            return res;
        },

        createBoard: async (parent, args, context) => {
            try {
                const board = await api.createBoard(args, context).then(res => res);
                console.log(board);
                
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
    }
}

module.exports = resolvers;