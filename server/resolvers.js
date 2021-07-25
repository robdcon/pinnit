const typeDefs =  {

    Query: {
        get: (parent, {key}, {get}) => {
            
            try {
                return get(key)
            } catch (error) {
                console.log(error)
                return null
            }
        }
    },

    Mutation: {
        set: async (parent, {key, value}, {set}) => {
            try {
                await set(key, value)
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    },
    
    User: {
        username: () => 'robdocn',
        email: () => 'robdcon@gmail.com',
        boards: () => null
    },

    Note: {
        id: () => 'note',
        text: () => 'text'
    },

    Board: {
        notes: () => ['note1', 'note2', 'note3']
    }
}

module.exports = typeDefs;