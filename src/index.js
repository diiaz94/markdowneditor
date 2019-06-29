import React, { Component } from 'react';
import { render } from 'react-dom';
import Editor from './Editor'


class App extends Component {
    
    constructor() {
        super();

    }

    render() {
        return (
           <Editor/>
        )
    }
}

render (
    <App/>,
    document.getElementById('root')
)
