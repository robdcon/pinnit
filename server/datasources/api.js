// require('dotenv').config();
const { genId } = require('../utils/helpers.js')
const secret = process.env.SECRET;



const api = {
    // Users
    createUser: async (username, email, context) => {
        try {
            let user = context.addUser({ username, email }).then(res => {
                console.log(res.data[0])
                return res.data[0] ;
            });
            return user
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getUser: async (email, context) => {
        try {
            const user = await context.getUser({email})
                .then(res => {
                    return res.data[0];
                })
            return user
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getUsers: async (context) => {
        const {Users} = await context.getUsers().then(res => {
            return res
        })
        return Users;
    },

    checkUserExists: async (email, username, context) => {
        const emailKeyExists = await context.exists('userEmails').then(res => res);
        const usernameKeyExists = await context.exists('userUsernames').then(res => res);
        if (emailKeyExists === 0 || usernameKeyExists === 0) {
            return { email: emailKeyExists, username: usernameKeyExists };
        }
        const emailExists = await context.sismember('userEmails', email).then(res => res);
        const usernameExists = await context.sismember('userUsernames', username).then(res => res);
        return { email: emailExists, username: usernameExists };
    },

    // Boards
    createBoard: async (args, context) => {
        try {
            const board = await context.addBoard(args).then(res => {
                console.log('New Board', res)
                return res.data[0].id
            })
            await context.addUserBoardRef({...args, board}).then(res => {
                console.log('Ref created:', res);
            })
            return board
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
            await context.sadd(`boards:${userId}`, board).then(res => { console.log('Boards added to user boards?:', res) });
            return `Board shared with ${user}`;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getBoards: async (user, context) => {
        try {
            const userBoards = await context.getUserBoards({user})
                .then(res => {
                    return res.data.map(board => board.board_id);
                })
            return userBoards
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getBoard: async (args, context) => {
        try {
            const board = await context.getBoard(args).then(res => {
                return res;
            })
            return board;
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    getEmails: async (context) => {
        const emails = await context.smembers('userEmails').then(res => res);
        return emails;
    },

    createNote: async (board, text, context) => { 
        try {
            const note = await context.createNote({board, text}).then(res => {
                return res.data[0];
            });

            const noteId = note.id;

            await context.addBoardNoteRef({board, note: noteId}).then(res => {
                console.log('Ref created:', res);
            })
            
            return note;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    updateNote: async (args, context) => {
        try {
            const updatedNote = context.updateNote(args)
            .then(res => {
                console.log('Updated note', res)
                return res.data[0]
            });
            return updatedNote;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    deleteNote: async (args, context) => {
        try {
            const res = context.deleteNote(args).then(res => {
                console.log("Note deleted?:", res);
                return res;
            });
            return res;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getNotes: async (board, context) => {
        const notes = await context.getBoardNotes({board})
            .then(res => {
                return res.data.map(note => {
                    return note.Notes
                })
            });
            console.log(`Board ${board} Notes: `, notes);
        return notes;
        // const promises = noteIds.map(noteId => {
        //     return context.clientMethods.hgetall(`${board}:notes:${noteId}`);
        // });
        // const notes = Promise.all(promises).then(res => res);
        // return notes;
    }

}

module.exports = api;