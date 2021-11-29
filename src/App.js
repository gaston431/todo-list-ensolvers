import React, {useEffect, useState} from 'react';
import './App.css';
import Items from './Items';
import "bootstrap/dist/css/bootstrap.min.css";

const baseUrl = 'http://localhost:8000/api/folders/';

function App() {

  const [folders, setFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  
  const [folderSelected, setFolderSelected] = useState({
    id: '',
    name: ''
  })

  const handleChange = e =>{
    const {name, value} = e.target
    setFolderSelected(prevState => ({
      ...prevState,
      [name]: value
    }))
    
    //console.log(folderSelected);
  }

  const peticionGet = async() => {
  
    await fetch(baseUrl)
      .then(res => res.json())
      .then(
        (result) => {
          //const json = result;
          //console.log('aqui ' + json);
          setFolders(result);
        },
        (error) => {
          console.log('There has been a problem with your fetch operation: ', error.message);
        }
      )

  }

  const peticionPost = async() => {
    
    await fetch(baseUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(folderSelected)
      })
      .then(res => res.json())
      .then(
        (result) => {
          setFolders(folders.concat(result));
        },
        (error) => {
          console.log('There has been a problem with your post operation: ', error.message);
        }
      )

  }

  const peticionDelete = async(e,id) => {
      
    await fetch(baseUrl + id, {
      method: 'delete'
      })
      .then(res => res.json())
      .then(
        (result) => {
          setFolders(folders.filter(folder => folder.id !== id));
        },
        (error) => {
          console.log('There has been a problem with your delete operation: ', error.message);
        }
      )
  }

  useEffect(() => {
    peticionGet();
    //console.log('useEffect '+items);
  },[])


  return (
    
    (!currentFolder) ? (
      
      <div className="main container">

      <h1> Folders </h1>
      <br /><br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {folders.map((folder,index) => {
          return(          
            <tr key={folder.id} >
              <td> 
                <input type="hidden" name="id" id="id" onChange={handleChange} value={folderSelected.id} />    
                {folder.name}
              </td>   
              <td> 
                <div className="btn-group" >
                  <button className="btn btn-primary" onClick={()=> setCurrentFolder(folder)}> View items </button>
                  <button className="btn btn-danger" onClick={(event) => {window.confirm("Are you sure?") && peticionDelete(event, folder.id)}}> Remove </button>
                </div>
              </td>
            </tr>
          )
      })}
      </tbody>
      </table>

      <br />
      <div className="input-group mb-3">
        <input className="form-control" type="text" name="name" id="name" onChange={handleChange} placeholder="New Folder" />
        <button className="btn btn-success" style={{width:"100px"}} onClick={()=>peticionPost()}>
            Add
        </button>
      </div>
    </div>
    
    ) : (
      <div className="container">
        <Items folder={currentFolder} />
        {currentFolder && <button className="btn btn-link" onClick={()=>setCurrentFolder(null)}> Go back </button>}
      </div>
    )
   
  );
}

export default App;
