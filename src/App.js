import { useState } from 'react'
import './App.css';

const files = [
  {
    name: 'File 0',
    url: 'https://cdns-preview-d.dzcdn.net/stream/c-d7396e9af50cff0ae076e34c4d1f74b2-8.mp3'
  },
  {
    name: 'File 1',
    url: 'https://cdns-preview-d.dzcdn.net/stream/c-d7396e9af50cff0ae076e34c4d1f74b2-8.mp3'
  },
  {
    name: 'File 2',
    url: 'https://cdns-preview-d.dzcdn.net/stream/c-d7396e9af50cff0ae076e34c4d1f74b2-8.mp3'
  },
  {
    name: 'File 3',
    url: 'https://cdns-preview-d.dzcdn.net/stream/c-d7396e9af50cff0ae076e34c4d1f74b2-8.mp3'
  },
]

function App() {
  const [downloaded, setDownloaded] = useState(false)

  const downloadAll = async () => {

    const folder = await window.showDirectoryPicker({
      mode: 'readwrite',
      startIn: 'music'
    })

    console.log('### FS DIRECTORY #####', folder)

    for (const file of files) {
      console.log('### PROCESSING ###', file.name)
      const fh = await folder.getFileHandle(file.name + '.txt', { create: true })
      console.log('### FS HANDLE ####', fh)

      const fws = await fh.createWritable()
      console.log('### FS WRITABLE STREAMS ####', fws)

      // Here there's no actual fetch as it would be blocked by CORS
      // but it has to be
      // const res = await fetch(file.url)
      // const blob = await res.blob()
      const datafile = new Blob(['sjhkfjdghfdgf'], { type: 'audio/mpeg' })

      fws.write(datafile)
      fws.close()
    }

    setDownloaded(true)
  }
  
  return (
    <div className="App">
      <header>
        <h1>Multi-Download</h1>
      </header>
      <section>
        {files.map(file => <a href={file.url} target="_blank" download rel="noreferrer" >Download {file.name} </a>)}
      </section>
      <section>
        <h3>Download all</h3>
        <button onClick={() => downloadAll()}>Download all files</button>
      </section>
      <section>
        <h3>Downloaded Files</h3>
        <p>
          {downloaded ? 'ALL FILES DOWNLOADED' : ''}
        </p>
      </section>
    </div>
  );
}

export default App;
