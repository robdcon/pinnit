import { useQuery } from "@apollo/client";
import { GET_NOTES, GET_REACTIVE_NOTES } from '../graphql/queries';

export const getNotes = () => {
    const { loading, data, error } = useQuery(GET_NOTES);
    return { loading, data, error };
}
