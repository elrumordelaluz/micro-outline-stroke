import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import qs from 'qs'
import './App.css'

class App extends Component {
  onDrop = files => {
    const file = files[0]
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = ({ target }) => {
      axios({
        url: 'http://localhost:3000',
        method: 'post',
        data: qs.stringify({ input: target.result }),
      })
        .then(res => console.log(res.data))
        .catch(e => console.log(e))
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Outline Stroke</h1>
        </header>
        <Dropzone onDrop={this.onDrop}>
          <p>
            Try dropping an svg file here, or click to select files to upload.
          </p>
        </Dropzone>
      </div>
    )
  }
}

export default App
