import { InMemoryCache, makeVar } from '@apollo/client';

export const notesVar = makeVar([]);

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
            localNotes: {
            read () {
              return notesVar();
            }
          }
        }
      }
    }
  });
