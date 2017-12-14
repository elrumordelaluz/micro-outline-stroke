import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import qs from 'qs'
import './styles.css'
import logo from './logo.svg'
import Clipboard from 'clipboard'

const url = 'https://micro-outline-stroke.now.sh/'

class App extends Component {
  state = { output: null, loading: false, copied: false }

  componentDidMount() {
    this.clipboard = new Clipboard('.copy')
    this.clipboard.on('success', e => {
      this.setState({ copied: true })
      e.clearSelection()
    })
  }

  onDrop = files => {
    this.resetOutput()
    const file = files[0]
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = ({ target }) => {
      this.setState({ loading: true })
      axios({
        url,
        method: 'post',
        data: qs.stringify({ input: target.result }),
      })
        .then(res => this.setState({ output: res.data, loading: false }))
        .catch(e => console.log(e))
    }
  }

  resetOutput = () => this.setState({ output: null, copied: false })

  render() {
    const { output, loading, copied } = this.state
    console.log(copied);
    return [
      <Dropzone
        key="dropzone"
        accept="image/svg+xml"
        disabled={loading}
        multiple={false}
        onDropAccepted={this.onDrop}
        className={`wrapper ${loading ? 'loading' : ''}`}
        activeClassName="wrapper__active"
        rejectClassName="wrapper__reject">
        <p className="message">Drop the svg file here</p>
        <img src={logo} className="logo" alt="logo" />
      </Dropzone>,
      <pre
        key="output"
        className={`output ${output ? 'show' : ''}`}>
        <button className="copy" data-clipboard-target="#foo">{copied ? 'Copied' : 'Copy'}</button>
        <button className="close" onClick={this.resetOutput}>
          ✕
        </button>
        <code id="foo">{output}</code>
      </pre>,
    ]
  }
}

export default App
