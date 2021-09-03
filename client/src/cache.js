import { InMemoryCache, makeVar } from '@apollo/client';

export const notesVar = makeVar([{
    text: "Initial note",
    zindex: 1,
    level: 'HIGH',
    id: 0
}]);

// export const cache = new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           notes: {
//             read () {
//               return notesVar();
//             }
//           }
//         }
//       }
//     }
//   });

export const cache = new InMemoryCache();