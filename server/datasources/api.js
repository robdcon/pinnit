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
    
    createNote: async (user, board, text, zindex, level, context) => {
        console.log('Board ID:',board);
        try {
            let id = context.incr(`${user}:${board}:noteId`);
            const newId = await id.then(res => {
                let uniqueId = `${user}${board}${res}`;
                console.log('Note id:',uniqueId)
                // Set user with id
                const note = context.hmset(`${user}:${board}:notes:${uniqueId}`, 'id', uniqueId, 'text', text, 'zindex', zindex, 'level', level);
                const setId = context.rpush(`${user}:${board}:noteIds`, `${uniqueId}`).then(res => {
                    console.log('ID set:', res)
                });
                return uniqueId;
            })
            return newId;
        } catch (error) {
            console.log(error)
            return false
        }
        
    },

    updateNote: async (user, board, id, text, zindex, level, context) => {
        try {
            console.table({id, text, zindex, level})
            let note;
            if(text) note = context.hset(`${user}:${board}:notes:${id}`, 'text', text);
            if(zindex) note = context.hset(`${user}:${board}:notes:${id}`, 'zindex', zindex);
            if(level) note = context.hset(`${user}:${board}:notes:${id}`, 'level', level);
            note.then(res => {
                console.log('Updated note', res)
                return res
            });
            return note;
        } catch (error) {
            console.log(error)
            return false
        }
        
    },

    deleteNote: async (user, board, id, context) => {
        try {
            context.lrem(`${user}:${board}:noteIds`, 0, id).then(res => console.log("res:", res));
            const note = context.del(`${user}:${board}:notes:${id}`)
            .then(res => res);
            return note;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getNotes: async (user, board, context, from=0, to=-1) => {
        const noteIds = await context.lrange(`${user}:${board}:noteIds`, from, to)
        .then(res => {
            console.log(res)
            return res
        });
        const promises = noteIds.map(noteId => {
            return context.hgetall(`${user}:${board}:notes:${noteId}`);
        });
        const notes = Promise.all(promises).then(res => res);
        return notes;
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
    }

}

module.exports = api;