require('dotenv').config();
const {genId} = require('../utils/helpers.js')
const secret = process.env.SECRET;

const api = {
    // Users
    createUser: async (username, email, context) => {
        try {
            let id = context.incr('users:id');
            await id.then(res => {
                context.hmset(`user:${res}`, 'email', email, 'username', username);
                context.hset(`users`, username, res).then(usersRes => {console.log('HSET Users', username, usersRes)});
                context.sadd('userEmails', `${email}`).then(emailRes => {console.log('SADD Email: ', emailRes); return emailRes});
                context.sadd('userUsernames', `${username}`).then(usernameRes => {console.log('SADD Username: ', usernameRes); return usernameRes});
                return res;
            })
            return {id, username, email};
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getUser: async (id, context) => {
        try {
            const user = await context.hgetall(`user:${id}`)
            .then(res => {
                return res;
            })
            return user
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getLoggedinUser: async (context) => {
        try {
            const userId = context.user();
            console.log(userId)
            return userId
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getUsers: async (context) => {
        const userIds = await context.smembers('userUsernames').then(res =>{
            return res
        })
        const promises = userIds.map(username => {
            const user = context.hget('users', username).then(res => {
                return context.hgetall(`user:${res}`);
            });
            return user
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

    // Boards
    createBoard: async (user, context) => {
        try {
            const boardId = await context.clientMethods.incr(`${user}:boardsIds`).then(res => {
                return `${user}${res}`
            });
            await context.clientMethods.sadd(`boards:${user}`, boardId).then(res => res);
            return `${boardId}`
        } catch (error) {
            console.log(error)
            return false
        }
    },

    shareBoard: async (user, board, context) => {
        try {
            const userId = await context.hget('users', user).then(res => {
                return res
            })
            await context.sadd(`boards:${userId}`, board).then(res => {console.log('Boards added to user boards?:', res)});
            return `Board shared with ${user}`;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getBoards: async (user, context) => {
        try {
            const userBoards = await context.clientMethods.smembers(`boards:${user}`)
            .then(res => {
                return res === null ? [] : res;
            })
            return userBoards
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getEmails: async (context) => {
        const emails = await context.smembers('userEmails').then(res => res);
        return emails;
    },
    
    createNote: async (user, board, text, zindex, level, context) => {
        console.log('Board ID:',board);
        try {
            let id = context.clientMethods.incr(`${user}:${board}:noteId`);
            const newId = await id.then(res => {
                let uniqueId = `${user}${board}${res}`;
                console.log('Note id:',uniqueId)
                // Set user with id
                const note = context.clientMethods.hmset(`${board}:notes:${uniqueId}`, 'id', uniqueId, 'text', text, 'zindex', zindex, 'level', level);
                const setId = context.clientMethods.rpush(`${board}:noteIds`, `${uniqueId}`).then(res => {
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
            if(text) note = context.clientMethods.hset(`${board}:notes:${id}`, 'text', text);
            if(zindex) note = context.clientMethods.hset(`${board}:notes:${id}`, 'zindex', zindex);
            if(level) note = context.clientMethods.hset(`${board}:notes:${id}`, 'level', level);
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
            context.clientMethods.lrem(`${board}:noteIds`, 0, id).then(res => console.log("res:", res));
            const note = context.clientMethods.del(`${board}:notes:${id}`)
            .then(res => res);
            return note;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getNotes: async (user, board, context, from=0, to=-1) => {
        const noteIds = await context.clientMethods.lrange(`${board}:noteIds`, from, to)
        .then(res => {
            console.log(res)
            return res
        });
        const promises = noteIds.map(noteId => {
            return context.clientMethods.hgetall(`${board}:notes:${noteId}`);
        });
        const notes = Promise.all(promises).then(res => res);
        return notes;
    }

}

module.exports = api;