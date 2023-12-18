import * as React from 'react'
import * as ReactDom from 'react-dom'

const HelloWorld = () => <h1>Hello world!</h1>
ReactDom.render(<HelloWorld />, document.getElementById('root'));