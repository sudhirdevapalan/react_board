import React, { Component } from 'react';
import './App.css';
import ListComponent from './components/lists';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_counter: 2,
      card_counter: 4,
      data: {
        list1: {
          card1: {
            desc: "card1",
            comments: ["Comment 1"],
          },
          card2: {
            desc: "card2",
            comments: [""],
          }, 
        },
        list2: {
          card3: {
            desc: "card3",
            comments: [""],
          },
          card4: {
            desc: "card4",
            comments: [""],
          },
        },
      }
    };
    this.list_comp = "col-md-" + Math.floor(12 / (Object.keys(this.state.data).length + 1));
    this.addComment = this.addComment.bind(this);
    this.addCard = this.addCard.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.drop = this.drop.bind(this);
    this.updateDesc = this.updateDesc.bind(this);
  }
  componentDidMount() {
    let old_state = localStorage.getItem('state');
    if (old_state) {
      this.setState(JSON.parse(old_state));
      this.list_comp = "col-md-" + Math.floor(12 / (Object.keys(JSON.parse(old_state).data).length + 1));
    }
  }
  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  addComment = (comment,cardid,listid) => {
    let newState = Object.assign({}, this.state);
    let currDate = new Date();
    newState["data"][listid][cardid]["comments"].push(comment + "\t-" + currDate.toLocaleString());
    this.setState(newState);

  }
  addCard = (listid) => {
    let newState = Object.assign({}, this.state);
    newState["card_counter"] = this.state.card_counter + 1;
    let cardName = "card" + newState.card_counter;
    newState["data"][listid][cardName] = {desc: cardName,comments: [""],};
    this.setState(newState);
  }
  addList = (listid) => {
    let newState = Object.assign({}, this.state);
    newState["list_counter"] = this.state.list_counter + 1;
    let listName = "list" + newState.list_counter;
    newState["data"][listName] = {};
    this.list_comp = "col-md-" + Math.floor(12 / (Object.keys(newState.data).length + 1));
    this.setState(newState);
  }

  deleteCard = (cardid,listid) => {
    let newState = Object.assign({}, this.state);
    delete(newState["data"][listid][cardid]);
    this.setState(newState);
  }
  deleteList = (listid) => {
    let newState = Object.assign({}, this.state);
    delete(newState["data"][listid]);
    this.list_comp = "col-md-" + Math.floor(12 / (Object.keys(newState.data).length + 1));
    this.setState(newState);
  }
  drop = (data,listid) => {
    let newState = Object.assign({}, this.state);
    let cardid = data.split(",")[0];
    let oldlistid = data.split(",")[1];
    let cardinfo = newState["data"][oldlistid][cardid];
    delete(newState["data"][oldlistid][cardid]);
    newState["data"][listid][cardid] = cardinfo;
    this.setState(newState);
  }
  updateDesc = (value,cardid,listid) => {
    let newState = Object.assign({}, this.state);
    newState["data"][listid][cardid]["desc"] = value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Team Dashboard</h1>
        <h3>Team Activity Board</h3>
        <div className="row wrp_board">
          
            {Object.keys(this.state.data).map((name, index)=>{
              return <div className={this.list_comp} key={index}><ListComponent updateDesc = {this.updateDesc} drop = {this.drop} deleteList = {this.deleteList} deleteCard = {this.deleteCard} addCard = {this.addCard} addComment = {this.addComment} key={index} listTitle = {name} listData = {this.state["data"][name]}/></div>;
            })}
          
          <div className={this.list_comp}>
            <div className="wrp_list">
              <span className="txt_new_list" onClick = {(elem)=>this.addList(elem.target.parentNode.closest(".wrp_list").id)}>
                Add new list...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;