import { List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'

function Todo( {text} ) {
    return (

        <List>
            <ListItem>
               <ListItemText primary={text} secondary="Please try to complete as fast as you can"/>
            </ListItem>
        </List>
    )
}

export default Todo
