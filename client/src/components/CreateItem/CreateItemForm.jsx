// create item form
import React, { useContext, useEffect, useState } from 'react';
import { addItem } from '../../api/mutations';
import { GET_ITEMS } from '../../graphql/queries';
import { BoardContext } from '../../App';
import { StyledCreateItemForm } from './CreateItem.styles.js';
import { StyledCreateItemButton } from './CreateItem.styles';
import AddCircleIcon from '@mui/icons-material/AddCircle'

const foodCategories = [
    'fruit',
    'vegetable',
    'salad',
    'baking',
    'frozen',
    'dairy',
    'meat',
    'rice, pasta, grains',
    'toiletries',
    'domestic',
    'other'
]

const CreateItemForm = () => {
    const { board } = useContext(BoardContext);

    let createItem = addItem({ board });

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
        try {
            createItem({
                variables: item
            })
        } catch (error) {
            alert('Error creating item:', error.message);
        }
        // Reset form fields
        setItem({
            name: '',
            description: '',
            category: '',
            priority: ''
        });
    };


    return (
        <StyledCreateItemForm onSubmit={handleSubmit}>
            <div>
                <label htmlFor="itemName">Item Name:</label>
                <input
                    type="text"
                    id="itemName"
                    value={item.name}
                    onChange={(e) => setItem({ ...item, name: e.target.value.toLowerCase() })}
                    required
                />

                <label htmlFor="itemCategory">Item Category:</label>
                <select
                    type="text"
                    id="itemCategory"
                    value={item.category}
                    onChange={(e) => setItem({ ...item, category: e.target.value.toLowerCase() })}
                    required
                >
                    <option value="">select a category</option>
                    {foodCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type="submit" >Create Item</button>
            </div>
        </StyledCreateItemForm>
    );

}
export default CreateItemForm;