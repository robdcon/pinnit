// create item form
import React, { useContext, useEffect, useState } from 'react';
import { addItem } from '../../api/mutations';
import { GET_ITEMS } from '../../graphql/queries';
import { BoardContext } from '../../App';
import {StyledCreateItemForm} from './CreateItem.styles.js';

const CreateItemForm = () => {
    const {board} = useContext(BoardContext);
    console.log('board in CreateItemForm:', board);

    let createItem = addItem({board});  
    
    const [item, setItem] = useState({
        board: board,
        name: '',
        description: '',
        category: '',
        priority: '',
        checked: false
    });

    createItem = addItem({ board });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
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
                />
                <button type="submit" >Create Item</button>
            </div>
        </StyledCreateItemForm>
    )
}
export default CreateItemForm;