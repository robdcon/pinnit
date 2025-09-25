// require('dotenv').config();
const e = require('express');
const { genId } = require('../utils/helpers.js')
const secret = process.env.SECRET;



const api = {
    // Users
    createUser: async (username, email, context) => {
        try {
            let user = context.addUser({ username, email });
            return user
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getUser: async (email, context) => {
        try {
            const user = await context.getUser({ email })
                .then(res => {
                    return res;
                })
            return user
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getUsers: async (context) => {
        const { Users } = await context.getUsers().then(res => {
            return res
        })
        return Users;
    },

    // Boards
    createBoard: async (args, context) => {
        const userId = await context.getUser({ email: args.user }).then(res => {
            return res.id
        })

        try {
            const board = await context.addBoard(args).then(res => {
                return res[0].id
            })
            await context.addUserBoardRef({ user: userId, board });
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
            await context.sadd(`boards:${userId}`, board);
            return `Board shared with ${user}`;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getBoards: async (user, context) => {
        try {
            const userBoards = await context.getUserBoards({ user })
                .then(res => {
                    return res.data.map(board => board.board_id);
                })
            return userBoards
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getBoard: async (boardId, context) => {
        try {
            const board = await context.getBoard(boardId);
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

    createNote: async (board, json, context) => {
        try {
            const note = await context.createNote({ json }).then(res => {

                return res.data[0];
            });

            const noteId = note.id;

            await context.addBoardNoteRef({ board, note: noteId });
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
                return res;
            });
            return res;
        } catch (error) {
            console.log(error)
            return false
        }
    },

    getNotes: async (board, context) => {
        const notesPromise = await context.getBoardNotes({ board })
            .then(res => {
                return res.data.map(noteId => {
                    return context.getNote(noteId)
                })
            });
        const notes = await Promise.all(notesPromise)
        return notes;
    },
    getItems: async (board, context) => {
        const itemsPromise = await context.getBoardItems({ board })
            .then(res => {
                return res.data.map(itemId => {
                    return context.getItem(itemId)
                })
            });
        const items = await Promise.all(itemsPromise)
        return items;
    },
    updateItem: async (args, context) => {
        try {
            const updatedItem = context.updateItem(args)
                .then(res => {
                    return res.data[0]
                });
            return updatedItem;
        } catch (error) {
            console.log(error)
            return false
        }
    },

}

module.exports = api;