import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import qs from 'qs'
import './styles.css'
import logo from './logo.svg'
import githubLogo from './github.svg'
import Clipboard from 'clipboard'

const url = 'https://micro-outline-stroke.now.sh/'

class App extends Component {
  state = { output: null, loading: false, copied: false, error: false }

  componentDidMount() {
    this.clipboard = new Clipboard('.copyButton')
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
      this.processInput(target.result)
    }
  }

  processInput = input => {
    this.setState({ loading: true, copied: false, error: false })
    const data = qs.stringify({ input })
    axios({
      url,
      method: 'post',
      data,
    })
      .then(res => this.setState({ output: res.data, loading: false }))
      .catch(e => {
        this.setState({
          loading: false,
          output: null,
          error: true,
        })
      })
  }

  inputChange = e => {
    const val = this.pasteInput.value.trim()

    if (val.includes('</svg>')) {
      this.pasteInput.value = ''
      this.pasteInput.blur()
      this.processInput(val)
    }
  }

  resetOutput = () => this.setState({ output: null, copied: false })

  download = () => {
    const { output, loading, error } = this.state
    if (output && !loading && !error) {
      const element = document.createElement('a')
      const file = new Blob([output], {
        type: 'image/svg+xml',
      })
      const fileURL = URL.createObjectURL(file)
      element.href = fileURL
      element.download = 'outlined-stroke.svg'
      element.click()
      // window.open(fileURL)
      window.URL.revokeObjectURL(fileURL)
    }
  }

  render() {
    const { output, loading, copied, error } = this.state
    return [
      <Dropzone
        key="dropzone"
        accept="image/svg+xml"
        disabled={loading}
        disableClick={true}
        multiple={false}
        onDropAccepted={this.onDrop}
        className={`wrapper ${loading ? 'loading' : ''}`}
        activeClassName="wrapper__active"
        rejectClassName="wrapper__reject">
        <input
          ref={input => (this.pasteInput = input)}
          className="message"
          placeholder="Drop the svg file or paste the code"
          onInput={this.inputChange}
        />
        {error && (
          <span className="error">
            An error was verified during your last svg processed
          </span>
        )}
        <img src={logo} className="logo" alt="logo" />
      </Dropzone>,
      <pre
        key="output"
        className={`output ${output && !loading ? 'show' : ''}`}>
        <div className="controls">
          <button className="button copyButton" data-clipboard-target="#foo">
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button className="button" onClick={this.download}>
            Download
          </button>
          <button className="button" onClick={this.resetOutput}>
            ✕
          </button>
        </div>
        <code id="foo">{output}</code>
      </pre>,
      <a
        key="github"
        href="https://github.com/elrumordelaluz/micro-outline-stroke"
        className="github">
        <img src={githubLogo} className="github_logo" alt="github logo" />
      </a>,
    ]
  }
}

export default App
