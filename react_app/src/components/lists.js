import React from 'react';
import CardComponent from './cards';

const ListComponent = (props) => (
	<div draggable="true" className="wrp_list" onDragOver={(event)=>event.preventDefault()} id={props.listTitle} onDrop={(event)=>{props.drop(event.dataTransfer.getData("transfer"),event.target.closest(".wrp_list").id)}}>
		<h2 className="txt_list_title">
			{props.listTitle}
			<button className=" btn btn-danger btn_list_delete" type="button" onClick = {(elem)=>{props.deleteList(elem.target.parentNode.closest(".wrp_list").id)}}>Delete List</button>
		</h2>
		{Object.keys(props.listData).map(function(name, index){
			return <CardComponent key={index} updateDesc = {props.updateDesc} cardDesc = {props.listData[name]["desc"]} cardComments = {props.listData[name]["comments"]} deleteCard = {props.deleteCard} addComment = {props.addComment} cardName = {name}/>;
		})}

		<div>
			<span className="txt_new_card" onClick={(elem)=>{props.addCard(elem.target.parentNode.closest(".wrp_list").id)}}>
				Add new card...
			</span>
		</div>
	</div>
	);
export default ListComponent;