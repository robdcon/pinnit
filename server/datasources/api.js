const api = {
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

    getNote: async (id, context) => {
        try {
            const note = await context.hgetall(`notes:${id}`)
            .then(res => {
                return res;
            })
            return note
        } catch (error) {
            console.log(error)
            return false
        }
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

    createUser: async (username, email, context) => {
        let userId;
        context.incr('users:id').then(res => {
            userId = res;
            context.rpush('users', userId);
        });
        try {
            const req = await context.hmset(`users:${userId}`, 'username', username, 'email', email);
            return req;
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