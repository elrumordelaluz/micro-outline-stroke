import React, {
  Component,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import Clipboard from 'clipboard'
import cn from 'classnames'

const initialFileName = 'svg'

function App() {
  let inputRef = useRef(null)
  let outputName = useRef(initialFileName)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  const onDrop = useCallback((files) => {
    const file = files[0]
    const reader = new FileReader()
    outputName.current = file.name.replace('.svg', '')
    reader.readAsText(file, 'UTF-8')
    reader.onload = ({ target }) => {
      processInput(target.result)
    }
  }, [])

  async function processInput(input) {
    setOutput(null)
    setCopied(false)
    setLoading(true)
    setError(false)

    const res = await fetch('/api/outline', {
      method: 'POST',
      body: JSON.stringify({ input, color: 'inherit' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json()

    setOutput(result.data)
    setLoading(false)
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/svg+xml',
    multiple: false,
    noClick: true,
  })

  function inputChange(e) {
    const val = inputRef.current.value.trim()

    if (val.includes('</svg>')) {
      inputRef.current.value = ''
      outputName.current = initialFileName
      inputRef.current.blur()
      processInput(val)
    }
  }

  function download() {
    if (output && !loading && !error) {
      const element = document.createElement('a')
      const file = new Blob([output], {
        type: 'image/svg+xml',
      })
      const fileURL = URL.createObjectURL(file)
      element.href = fileURL
      element.download = `${outputName.current}__outlined.svg`
      element.click()
      // window.open(fileURL)
      window.URL.revokeObjectURL(fileURL)
    }
  }

  useEffect(() => {
    let cb = new Clipboard('.copyButton')
    cb.on('success', (e) => {
      setCopied(true)
      e.clearSelection()
    })
    return () => {
      cb.destroy()
    }
  }, [])

  return (
    <>
      <div
        {...getRootProps()}
        className={cn('wrapper', {
          loading,
          wrapper__active: isDragActive,
          wrapper__reject: isDragReject,
        })}
      >
        <input {...getInputProps()} />
        <Image src="/logo.svg" alt="Logo" layout="fill" className="logo" />
        <input
          ref={inputRef}
          disabled={loading}
          className="message"
          placeholder="Drop the svg file or paste the code"
          onInput={inputChange}
        />
      </div>
      <div
        key="output"
        className={`output ${output && !loading ? 'show' : ''}`}
      >
        <pre className="code">
          <div className="controls">
            <button className="button copyButton" data-clipboard-target="#foo">
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button className="button" onClick={download}>
              Download
            </button>
            <button
              className="button"
              onClick={() => {
                setOutput(null)
                setCopied(false)
              }}
            >
              ✕
            </button>
          </div>
          <code id="foo">{output}</code>
        </pre>
      </div>
      <a
        key="github"
        href="https://github.com/elrumordelaluz/micro-outline-stroke"
        className="github"
      >
        <div className="github_logo">
          <Image src="/github.svg" alt="Github Logo" width={25} height={25} />
        </div>
      </a>
    </>
  )
}

class _App extends Component {
  state = { output: null, loading: false, copied: false, error: false }

  componentDidMount() {
    this.clipboard = new Clipboard('.copyButton')
    this.clipboard.on('success', (e) => {
      this.setState({ copied: true })
      e.clearSelection()
    })
    this.outputName = initialFileName
  }

  onDrop = (files) => {
    this.resetOutput()
    const file = files[0]
    const reader = new FileReader()
    this.outputName = file.name.replace('.svg', '')
    reader.readAsText(file, 'UTF-8')
    reader.onload = ({ target }) => {
      this.processInput(target.result)
    }
  }

  processInput = async (input) => {
    this.setState({ loading: true, copied: false, error: false })
    // const data = qs.stringify({ input, color: 'inherit' })

    const res = await fetch('/api/outline', {
      method: 'POST',
      body: JSON.stringify({ input, color: 'inherit' }),
    })
    const result = await res.json()

    this.setState({ output: result.data, loading: false })
    // axios({
    //   url,
    //   method: 'post',
    //   data,
    // })
    //   .then((res) => this.setState({ output: res.data, loading: false }))
    //   .catch((e) => {
    //     this.setState({
    //       loading: false,
    //       output: null,
    //       error: true,
    //     })
    //   })
  }

  inputChange = (e) => {
    const val = this.pasteInput.value.trim()

    if (val.includes('</svg>')) {
      this.pasteInput.value = ''
      this.outputName = initialFileName
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
      element.download = `${this.outputName}__outlined.svg`
      element.click()
      // window.open(fileURL)
      window.URL.revokeObjectURL(fileURL)
    }
  }

  render() {
    const { output, loading, copied, error } = this.state
    return [
      // <Dropzone
      //   key="dropzone"
      //   accept="image/svg+xml"
      //   disabled={loading}
      //   disableClick={true}
      //   multiple={false}
      //   onDropAccepted={this.onDrop}
      //   className={`wrapper ${loading ? 'loading' : ''}`}
      //   activeClassName="wrapper__active"
      //   rejectClassName="wrapper__reject"
      // >
      //   <input
      //     ref={(input) => (this.pasteInput = input)}
      //     disabled={loading}
      //     className="message"
      //     placeholder="Drop the svg file or paste the code"
      //     onInput={this.inputChange}
      //   />
      //   {error && (
      //     <span className="error">
      //       An error was verified during your last svg processed
      //     </span>
      //   )}

      //   <Image
      //     src="/logo.svg"
      //     alt="Logo"
      //     width={500}
      //     height={500}
      //     className="logo"
      //   />
      // </Dropzone>,
      <div
        key="output"
        className={`output ${output && !loading ? 'show' : ''}`}
      >
        <pre className="code">
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
        </pre>
      </div>,
      <a
        key="github"
        href="https://github.com/elrumordelaluz/micro-outline-stroke"
        className="github"
      >
        <Image
          src="/github.svg"
          alt="Github Logo"
          width={500}
          height={500}
          className="github_logo"
        />
      </a>,
    ]
  }
}

export default App
