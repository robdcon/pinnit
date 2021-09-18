const api = {
    createUser: async (username, email, context) => {
        try {
            let id = context.incr('users:id');
            await id.then(res => {
                // Set user with id
                context.hmset(`user:${res}`, 'email', email, 'username', username);
                context.hset(`users`, username, res);
                context.sadd('userEmails', `${email}`).then(res => {console.log('SADD Email: ', res); return res});
                context.sadd('userUsernames', `${username}`).then(res => {console.log('SADD Username: ', res); return res});
                return res;
            })
            // context.smembers('userEmails').then(res => {
            //     console.log('userEmails:', res);
            // })
            // context.smembers('userUsernames').then(res => {
            //     console.log('userUsernames:', res);
            // })
        
            console.log({id, username, email})
            return {id, username, email};
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

    checkUserExists: async (email, username, context) => {
        const emailKeyExists = await context.exists('userEmails').then(res => res);
        const usernameKeyExists = await context.exists('userUsernames').then(res => res);
        if(emailKeyExists === 0 || usernameKeyExists === 0) {
            return {email:emailKeyExists, username:usernameKeyExists};
        }
        const emailExists = await context.sismember('userEmails', email).then(res => res);
        const usernameExists = await context.sismember('userUsernames', username).then(res => res);
        return {email:emailExists, username:usernameExists};
    },

    getEmails: async (context) => {
        const emails = await context.lrange('userEmails', 0, -1).then(res => res);
        return emails;
    },
    
    createNote: async (text, zindex, level, context) => {
        try {
            let id = context.incr('notes:id');
            
            id.then(res => {
                console.log('Note id:',res)
                // Set user with id
                const note = context.hmset(`notes:id:${res}`, 'id', res, 'text', text, 'zindex', zindex, 'level', level);
                const setId = context.rpush('noteIds', `${res}`);
                return {id: res, note, setId};
            })
            return id;
        } catch (error) {
            console.log(error)
            return false
        }
        
    },

    updateNote: async (id, text, zindex, level, context) => {
        try {
            console.table({id, text, zindex, level})
            let note;
            if(text) note = context.hset(`notes:id:${id}`, 'text', text);
            if(zindex) note = context.hset(`notes:id:${id}`, 'zindex', zindex);
            if(level) note = context.hset(`notes:id:${id}`, 'level', level);
            note.then(res => res);
            return note;
        } catch (error) {
            console.log(error)
            return false
        }
        
    },

    deleteNote: async (id, context) => {
        try {
            context.lrem('noteIds', 0, id).then(res => console.log("res:", res));
            const note = context.del(`notes:id:${id}`)
            .then(res => res);
            return note;
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

    getBoard: async (id, user, context) => {
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

    getBoards: async (user, context) => {
        try {
            const userBoards = await context.smembers(`boards:${user}`)
            .then(res => res)
            return userBoards
        } catch (error) {
            console.log(error)
            return false
        }
    },

    createBoard: async (user, context) => {
        const boardId = await context.incr(`${user}boardsIds`).then(res => res);
        console.log("Board ID: ", boardId)
        try {
            const addBoard = await context.sadd(`boards:${user}`, boardId).then(res => res);
            console.log('Boards added to user boards?:', addBoard);
            // const result = await context.zadd(`notes:${boardId}`, 'id', id);
            return `${boardId}`
        } catch (error) {
            console.log(error)
            return false
        }
    }

}

module.exports = api;