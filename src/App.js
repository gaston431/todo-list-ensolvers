import React, {useEffect, useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const baseUrl = 'http://localhost:8000/api/items/';

function App() {

  const [items, setItems] = useState([])
  const [modalEditar, setModalEditar] = useState(false)
  
  const [itemSelected, setItemSelected] = useState({
    id: '',
    title: '',
    isCompleted: false
  })

   

  /*const handleChangeCheck = (position) =>{
     console.log('qwe')
    console.log(items)
    
    const updatedCheckedState = items.map((item, index) =>
      index === position ? !item.isCompleted : item.isCompleted
    )
     console.log('qwe2')
    console.log(updatedCheckedState)
    setCheckedState(updatedCheckedState);
  }*/

  const handleChange = e =>{
    const {name, value, type, checked} = e.target
    setItemSelected(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }))
    
    //console.log(itemSelected);
  }

  const peticionGet = async() => {
  //async function peticionGet() {

    await fetch(baseUrl)
      .then(res => res.json())
      .then(
        (result) => {
          //const json = result;
          //console.log('aqui ' + json);
          setItems(result);
        },
        (error) => {
          console.log('There has been a problem with your fetch operation: ', error.message);
        }
      )

  }

  const peticionPost = async() => {
  //async function peticionPost() {
    
    await fetch(baseUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemSelected)
      })
      .then(res => res.json())
      .then(
        (result) => {
          setItems(items.concat(result));
        },
        (error) => {
          console.log('There has been a problem with your post operation: ', error.message);
        }
      )

  }

  /*function handleChangeCheck(id) {
    console.log('handleChangeCheck')
    console.log(id)
    let updatedItems = items.map(item => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
        setItemSelected({ 
          id: item.id,
          title: item.title,
          isCompleted: item.isCompleted})
      }
      return item;
    });
    console.log('ItemSelected')
    console.log(itemSelected)
    //setItems(updatedItems);
  };*/

  function handleChangeCheck(i) {
    const temporaryItems = [...items];
    temporaryItems[i].isCompleted = !temporaryItems[i].isCompleted;
    const itemMod = temporaryItems[i]
    
    setItems(temporaryItems);
    peticionPut(itemMod)
  };
  
  const peticionPut = async(itemMod) => {
      
    await fetch(baseUrl + itemMod.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemMod)
      })
      .then(res => res.json())
      .then(
        (result) => {
          var itemNuevo = items;
          itemNuevo.map(item => {
            if(itemMod.id === item.id){
              item.title = itemMod.title;
              item.isCompleted = itemMod.isCompleted;
            }
          })
          setItems(itemNuevo);
          setModalEditar(false);
          console.log(result);
        },
        (error) => {
          console.log('There has been a problem with your put operation: ', error.message);
        }
      )

  }

  const peticionDelete = async(e,id) => {
  //async function peticionDelete() {
    
    await fetch(baseUrl + id, {
      method: 'delete'
      })
      .then(res => res.json())
      .then(
        (result) => {
          setItems(items.filter(item => item.id !== id));
        },
        (error) => {
          console.log('There has been a problem with your delete operation: ', error.message);
        }
      )

  }


  function seleccionarItem (item) {
    setItemSelected(item);
  }

  useEffect(() => {
    peticionGet();
    //console.log('useEffect '+items);
  },[])

  
  return (
    <div className="App">
    <div className="main">

      <h1> To-Do List </h1>
      <br /><br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Is completed</th>
            <th scope="col">Title</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {items.map((item,index) => {
          return(          
            <tr key={item.id} >
                
              <td>                          
                <input type="hidden" name="id" id="id" onChange={handleChange} value={itemSelected.id} /> 
                <input type="checkbox" 
                    name={item.title}  id={`custom-checkbox-${index}`}
                    checked={item.isCompleted}
                    onChange={() => handleChangeCheck(index)}
                     />
              </td>   
              <td>    
                {item.title}
              </td>   
              <td> 
                <button className="btn btn-primary" onClick={()=>{seleccionarItem(item); setModalEditar(true)}}> Edit </button>
                
                <button className="btn btn-danger" onClick={(event) => {window.confirm("Are you sure?") && peticionDelete(event, item.id)}}> Remove </button>
              </td>
            </tr>
          )
      })}
      </tbody>
      </table>

      <br />
      <input type="text" name="title" id="title" onChange={handleChange} placeholder="New Task" />
      <button className="btn btn-success" onClick={()=>peticionPost()}>
          Add
      </button>

    </div>


      <Modal isOpen={modalEditar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'left'}} >Editing Task "{itemSelected.title}"</span>
                  <span style={{float: 'right'}} onClick={()=>setModalEditar(false)}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                                        
                    <input className="form-control" type="text" name="title" id="title" 
                    onChange={handleChange} 
                    value={itemSelected.title}/>
                                        
                  </div>
                </ModalBody>

                <ModalFooter>
                  <button className="btn btn-success" onClick={()=>peticionPut(itemSelected)}>
                    Save
                  </button> 
                  <button className="btn btn-danger" onClick={()=>setModalEditar(false)}>Cancel</button>
                </ModalFooter>
      </Modal>


    </div>
  );
}

export default App;
