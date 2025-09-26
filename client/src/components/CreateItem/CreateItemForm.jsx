// create item form
import React, { useContext, useState } from 'react';
import { addItem } from '../../api/mutations';
import { GET_ITEMS } from '../../graphql/queries';
import { BoardContext } from '../../App';
import {StyledCreateItemForm} from './CreateItem.styles.js';

const CreateItemForm = () => {
    const { boardId } = useContext(BoardContext);
    
    const [item, setItem] = useState({
        name: '',
        description: '',
        category: '',
        priority: '',
        checked: false
    });

    
    
    const createItem = addItem({ boardId });
    console.log(createItem);
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Item:', item);
        createItem({
            variables: item
        })
        // // Reset form fields
        // setItemDetails({
        //     name: '',
        //     description: '',
        //     category: '',
        //     priority: ''
        // });
    };
    
    return (
        <StyledCreateItemForm onSubmit={handleSubmit}>
            <div>
                <label htmlFor="itemName">Item Name:</label>
                <input
                    type="text"
                    id="itemName"
                    value={item.name}
                    onChange={(e) => setItem({...item, name: e.target.value})}
                    required
                />
                
                <label htmlFor="itemDescription">Item Description:</label>
                <input
                    type="text"
                    id="itemDescription"
                    value={item.description}
                    onChange={(e) => setItem({...item, description: e.target.value})}
                    required
                />
                
                
                <label htmlFor="itemCategory">Item Category:</label>
                <input
                    type="text"
                    id="itemCategory"
                    value={item.category}
                    onChange={(e) => setItem({...item, category: e.target.value})}
                    required
                />
                
                
                <label htmlFor="itemPriority">Item Priority:</label>
                <input
                    type="text"
                    id="itemPriority"
                    value={item.priority}
                    onChange={(e) => setItem({...item, priority: e.target.value})}
                    required
                />
                <button type="submit" >Create Item</button>
            </div>
        </StyledCreateItemForm>
    )
}
export default CreateItemForm;