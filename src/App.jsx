import './App.css'
import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Title from './components/Title'
import Button from 'react-bootstrap/Button'
import MyVerticallyCenteredModal from './components/MyVerticallyCenteredModal'
import { useEffect } from 'react'
import List from './components/List'
import FiEdit from './assets/FiEdit'

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [items, setItems] = useState([])

  const ENDPOINT_URL = "https://6508f19656db83a34d9cc4d8.mockapi.io/todo_list";

  const getItems = async () => {
  try {
    const response = await fetch(ENDPOINT_URL);
    const data = await response.json();
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setItems(data);
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
  }

useEffect(() => {
  getItems();
}, []);

  const addItem = async (item) => {
    setItems([...items, item]);
    try {
      const response = await fetch(ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        getItems();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const deleteItem = async (id) => {
    setItems(items.filter((item) => item.id !== id));
    try {
      const response = await fetch(`${ENDPOINT_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getItems();
      }
    } catch (error) {
      console.error(error.message);
    }
  }



  return (
    <>
      <div className="container">
        <div className="row mx-auto">
          <div className="col">
            <Title />
          </div>
          <div className="col-3 mt-auto mb-3 col-sm-12 text-center">
            <Button variant="success w-75" onClick={() => setModalShow(true)}>
              <FiEdit /> Add Item
            </Button>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            addItem={addItem}
          />
        </div>

        <div className="row mx-auto">
          <div className="col">
            <List items={items} deleteItem={deleteItem} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App
