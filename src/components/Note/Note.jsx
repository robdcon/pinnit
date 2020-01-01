import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { StyledNote } from './Note.styles';
import Draggable from 'react-draggable';
import FlexContainer from '../FlexContainer';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import postItNoteLow from "../../img/post-it-note-low.png"
import postItNoteMed from "../../img/post-it-note-med.png"
import postItNoteHigh from "../../img/post-it-note-high.png"

const priorityLevels = 
[
    {
        level:'Low',
        img:postItNoteLow
    },
    {
        level:'Med',
        img:postItNoteMed
    },
    {
        level:'High',
        img:postItNoteHigh
    },
]

const iconStyles = {

    color:'#000'

}

const StyledControlContainer = styled.span`

  // visibility: ${(props) => props.active ? 'visible' : 'hidden' }
  width: 100%;
  height: 60px;
  background-color: transparent;
  position: absolute;
  left: 0;
  bottom: 1em;
  opacity:0;

`

const NoteFooter = (props) => 
{
  return(
    
    <StyledControlContainer>
      <FlexContainer justify="space-evenly">
       {props.children}
      </FlexContainer>
    </StyledControlContainer>

  )
}

class Note extends PureComponent 
{ 
  constructor(props) 
  {
    super(props);

    this.state = {
      hasError: false,
      editing: false,
      inFocus: false,
      priorityLevel:this.props.priorityLevel
    };
  }

  background = () =>
  {
      const level = this.state.priorityLevel
      return priorityLevels[level].img
  }
   // Set random position of each rendered Note

  randomPosition = (x, y, s) =>
  {
      return (x + Math.ceil(Math.random() * (y-x))) + s

  }

  // Change state of Note by setting editing to true

  edit = () =>
  {
      this.setState({editing: true})
  }

  // Fire onChange event taking the value of newText and the id as arguments

  save = () =>
  {
      
      this.props.onChange(this.refs.newText.value, this.props.id)
      
      this.setState({editing:false})
  }

  // Fire onRemove with id of the Note as an argument

  remove = () =>
  {
      this.props.onRemove(this.props.id)
  }

  increasePriority = (id) =>
  {
      this.setState((prevState) => 
      {
          return {priorityLevel:(prevState.priorityLevel + 1 > 2) ? 0 : prevState.priorityLevel + 1}
      }, () =>
      {
          this.props.onPriorityChange(this.state.priorityLevel, this.props.id)
      });
  }

  decreasePriority = (id) =>
  {
    
      this.setState((prevState) => 
      {
          return {priorityLevel:(prevState.priorityLevel - 1 < 0) ? 2 : prevState.priorityLevel - 1}
      }, () =>
      {
          this.props.onPriorityChange(this.state.priorityLevel, this.props.id)
      });
    
  }

  // Return a text area input field to add new text to

  renderForm = () => 
  {
      return (
          <StyledNote className="note" style={this.style}>
            <textarea ref="newText"
                      defaultValue={this.props.children}></textarea>
            <SaveIcon onClick={this.save}>SAVE</SaveIcon>
          </StyledNote>
      )
  }

  // Return 
  renderDisplay = () =>
  {
      return ( 
          <StyledNote onFocus={() => console.log('hello')} className="note" style={this.style}>

              <p>{this.props.children}</p>

              <NoteFooter className="NoteFooter">
               
                  <EditIcon style={iconStyles} onClick={this.edit} />
                  <DeleteIcon style={iconStyles} onClick={this.remove} />
                  <KeyboardArrowUpIcon style={iconStyles} onClick={this.increasePriority} />
                  <KeyboardArrowDownIcon style={iconStyles} onClick={this.decreasePriority} />
               
              </NoteFooter>

          </StyledNote>
          )
  }

  componentWillMount = () => 
  {
    console.log('Note will mount');
    this.style = 
    { 
        // Set random position of each note

        //backgroundImage:"url('./img/post-it-note.png')",
        backgroundImage : `url(${this.background()})`,
    
        right:this.randomPosition(0, window.innerWidth - 150, 'px'),
        top:this.randomPosition(0, window.innerHeight - 150, 'px')
    }
  }

  componentDidMount = () => 
  {
    console.log('Note mounted');
  }

  componentWillReceiveProps = (nextProps) => 
  {
    console.log('Note will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => 
  {
    console.log('Note will update', nextProps, nextState);
  }

  componentDidUpdate = () => 
  {
    console.log('Note did update');
    if(this.state.editing)
    {
        this.refs.newText.focus()
        this.refs.newText.select()
    }
    this.style.backgroundImage = `url(${this.background()})`
  }

  componentWillUnmount = () => 
  {
    console.log('Note will unmount');
  }

  render () {
    if (this.state.hasError) 
    {
      return <h1>Something went wrong.</h1>;
    }
    return (

      <Draggable enableUserSelectHack={false}>
      {
        (this.state.editing) ? this.renderForm()
                             : this.renderDisplay()
      }
      </Draggable>
     
       
    );
  }
}

Note.propTypes = {
  // bla: PropTypes.string,
};

Note.defaultProps = {
  // bla: 'test',
};

export default Note;
