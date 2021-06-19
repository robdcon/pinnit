import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyledBoard } from './Board.styles';
import Note from '../Note'
import StickyFooter from '../StickyFooter'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MainTheme from '../../themes/MainTheme.config'

class Board extends PureComponent 
{ 
  constructor(props) 
  {
    super(props);

    this.state = 
    {
      hasError: false,
      notes: [],
      count:0
    };
  }

  //Method for handling unique ID for each note

  nextId = () =>
  {
    this.state.uniqueId = this.state.uniqueId || 0
    return this.state.uniqueId++
  }

  // Add a note to the Board

  add = (text) =>
  {
      //text = "New Note"
      var notes = [
          ...this.state.notes,
          {
              id:this.nextId(),
              note:text,
              priorityLevel:1

          }
      ]
      this.setState({notes})
  }

  checkLocalStorage = () =>
  {
      if (typeof localStorage !== 'undefined') {
          try {
              localStorage.setItem('feature_test', 'yes');
              if (localStorage.getItem('feature_test') === 'yes') {
                  localStorage.removeItem('feature_test');
                  // localStorage is enabled
                  console.log('Local Enabled')
                  return true
              } else {
                  // localStorage is disabled
                  console.log('Local Disabled')
                  return false
              }
          } catch(e) {
              // localStorage is disabled
              console.log('Local Disabled', e)
              return false
          }
      } else {
          // localStorage is not available
          console.log('Local Not Available')
          return false
      }
  }

  saveNotesToLocal = () =>
  {
      const board = 
      {
          uniqueId: this.state.uniqueId || 0,
          notes: this.state.notes
      }
      const jsonNotes = JSON.stringify(board)
      localStorage.setItem('message_board_notes', jsonNotes);
      console.log('saved')
  }


  // Update the array of notes in the Board class's state
  // Map through each note using a callback function
  // If the note ID is not equal to the current note return note
  // Otherwise return note with its original keys except for 'note' key, which is set to new text
  // Set the state of the Board classs to the new notes variable

  update = (newText, id) =>
  {
      var notes = this.state.notes.map(

          note => (note.id !== id) ?
          note : 
              {
                  ...note,
                  note:newText
              }

          )
      this.setState({notes});
     
  }
 

  updatePriority = (priorityLevel, id) =>
  {
      const newLevel = priorityLevel--
      var notes = this.state.notes.map(

          note => (note.id !== id) ?
          note : 
              {
                  ...note,
                  priorityLevel:newLevel
              }

          )
      this.setState({notes});
     
  }

  componentWillMount()
  {

      const board = JSON.parse(localStorage.getItem('message_board_notes'))

      if(!board) return
    
      const notes = board.notes   
      const id = board.uniqueId
     
      if(!notes.length > 0)
      {
          console.log('no notes')
          return
      }
      else
      {
          console.log(notes)
      }
      this.setState({
          notes:notes,
          uniqueId:id
      })
     
  }

  componentDidUpdate(prevState, state)
  {
      if(prevState.notes !== this.state.notes)
      {
          console.log('updated')
          this.saveNotesToLocal()
      }
      else
      {
          console.log('not updated')
          alert('error, not saved to local')
      }
      if(prevState.priorityLevel !== this.state.priorityLevel)
      {
          console.log('update priority')
      }
  }
  
  // Takes the note's id as an argument
  // Filter through the notes state of Board class
  // Return a new array consisting of all notes whise id does not match the id parameter

  remove = (id) =>
  {
      var notes = this.state.notes.filter(note => note.id !== id)
      this.setState({notes})
  }

  clearAllNotes = () =>
  {
      this.setState({
          notes:[]
      })
      localStorage.setItem('message-board-notes', "")
  }

  // Return an instance of Note
  // Set the key and id to note.id
  // Set methods to handle updating and removing notes
  // Set the child to the notes text

  eachNote = (note) =>
  {
    return (

        <Note key={note.id} 

              id={note.id} 
              priorityLevel={note.priorityLevel}
              onChange={this.update} 
              onRemove={this.remove}
              onPriorityChange={this.updatePriority}
              >
                {
                    note.note
                }

        </Note>

        )
  }

  componentWillMount = () => 
  {
    console.log('Board will mount');
    const board = JSON.parse(localStorage.getItem('message_board_notes'))

    if(!board) return
  
    const notes = board.notes   
    const id = board.uniqueId
    
    if(!notes.length > 0)
    {
        console.log('no notes')
        return
    }
    else
    {
        console.log(notes)
    }
    this.setState({
        notes:notes,
        uniqueId:id
    })
  }

  componentDidMount = () => 
  {
    console.log('Board mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Board will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Board will update', nextProps, nextState);
  }

  componentDidUpdate = (prevState, props) => 
  {
    console.log('Board did update');
    if(prevState.notes !== this.state.notes)
        {
            console.log('updated')
            this.saveNotesToLocal()
        }
        else
        {
            console.log('not updated')
            alert('error, not saved to local')
        }
        if(prevState.priorityLevel !== this.state.priorityLevel)
        {
            console.log('update priority')
        }
  }

  componentWillUnmount = () => 
  {
    console.log('Board will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (

      <div>
        <StyledBoard className="BoardWrapper">
          {(this.state.notes.length > 0) ? this.state.notes.map(this.eachNote) : null}
          <StickyFooter>
            <AddCircleIcon  style={{ color: '#ffffff', fontSize:'3em'}} onClick={() => this.add('New Message')} />
          </StickyFooter>
        </StyledBoard>
      </div>
       
    );
  }
}

Board.propTypes = {
  // bla: PropTypes.string,
};

Board.defaultProps = {
  // bla: 'test',
};

export default Board;
