import './App.css'
import config from './envImport/config';

function App() {
  console.log(config.appwriteProjectID);
  console.log(config.appwriteDatabaseID);
  return (
    <>
      <h1>Blog with appwrite</h1>
    </>
  )
}

export default App
