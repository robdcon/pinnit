const api = {
    createUser: async (username, email, context) => {
        try {
            let id = context.incr('users:id');
            id.then(res => {
                // Set user with id
                const userReq = context.hmset(`users:id:${res}`, 'email', email, 'username', username);
                const idReq = context.rpush('userIds', `${res}`);
                return {id: res, userReq, idReq};
            })
            return true;
        } catch (error) {
            console.log(error)
            return false
        }
        
    },

    getUser: async (id, context) => {
        try {
            const user = await context.hgetall(`users:${id}`)
            .then(res => {
                return res;
            })
            return user
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getUsers: async (context, from=0, to=-1) => {
        const userIds = await context.lrange('userIds', from, to)
        .then(res => res)
        const promises = userIds.map(userId => {
            return context.hgetall(`users:id:${userId}`);
        });
        const users = Promise.all(promises).then(res => res);
        return users;
    },
    
    createNote: async (text, zindex, level, context) => {
        try {
            let id = context.incr('notes:id');
            console.log('Note id:',id)
            id.then(res => {
                // Set user with id
                const note = context.hmset(`notes:id:${res}`, 'text', text, 'zindex', zindex, 'level', level);
                const setId = context.rpush('noteIds', `${res}`);
                return {id: res, note, setId};
            })
            return true;
        } catch (error) {
            console.log(error)
            return false
        }
        
    },

    getNote: async (id, context) => {
        try {
            const note = await context.hgetall(`notes:id:${id}`)
            .then(res => {
                return res;
            })
            return note
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getNotes: async (context, from=0, to=-1) => {
        const noteIds = await context.lrange('noteIds', from, to)
        .then(res => res);
        const promises = noteIds.map(noteId => {
            return context.hgetall(`notes:id:${noteId}`);
        });
        const notes = Promise.all(promises).then(res => res);
        return notes;
    },

    getBoard: async (id, context) => {
        try {
            const board = await context.hgetall(`user:${id}`)
            .then(res => {
                return res;
            })
            return board
        } catch (error) {
            console.log(error)
            return false
        }
    },



    createBoard: async (notes, users, context) => {
        let boardId;
        context.incr('boards:id').then(res => {
            boardId = res;
        });
        try {
            await hmset(`boards:${boardId}`, 'notes', notes, 'users', users );
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

}

module.exports = api;