import React, { Component } from 'react'
import './App.css'
import Modal from 'react-modal'
//import axios from 'axios'
//TT

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height:500,
    width:1000

  }
};


const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      cards: [],
      data: [],
      myList : [],
      modalIsOpen: false

    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.listData = this.listData.bind(this)
    this.addNewCard = this.addNewCard.bind(this)
    this.removedCard = this.removedCard.bind(this)
  }

  async componentDidMount(){
    const response = await fetch(`http://localhost:3030/api/cards`);
    const json = await response.json();
    this.setState({ cards: json.cards });
    this.listData(json.cards)
    
  }

  listData(data){
    //console.log(data)
    this.setState({
      data: data
    })
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
    //console.log(this.state.cards)
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  addNewCard(Data){
    //console.log(Data/)
    this.setState({
      myList: this.state.myList.concat([Data])
    })
    
  }
  removedCard(key){
    let index = this.state.myList.indexOf(key)
    console.log(index)
    this.setState({
      myList: this.state.myList.splice(index)
    })
    
  }


  render() {
    var {cards, myList,data} = this.state
    return (
      <div className="App">
        <div className="Container">
          <div className="Box">
            My PokeDek
          </div>
          <div className="Box2">
          {myList.map((item ,key)=>
              <div className="cards2">
              <img src={item.imageUrl} style={{height:300}}/>
              <div>
                name : {item.name}<br></br>
                <lable className="addcard" index={key} onClick={()=>{this.removedCard(item)}}>Remove Card</lable>
              </div>
          </div>
              
              )}
          </div>
          <div className="Box3">
                  <div className="D1">
                    <button onClick={this.openModal}>Click</button>
                  </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <input type="text" placeholder="Find Pokemon" />
          {//data.map((item)=> <li>{item.name}</li>)}
              data.map((item)=>
                  <div className="cards1">
                      <img src={item.imageUrl} style={{height:300}}/>
                      <div>
                        name : {item.name}<br></br>
                        <lable className="addcard" onClick={()=>{this.addNewCard(item)}}>Add Card</lable>
                      </div>
                  </div>
                
              )
          }
         
          

          <button onClick={this.closeModal}>close</button>
         {}
          <form>
          
          </form>
        </Modal>
      
      </div>
    )
  }
}

export default App
