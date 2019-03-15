import React from 'react';
//import $ from 'jquery';


const CardComponent = (props) => (
	<div draggable="true" className="wrp_card" id={props.cardName} onDragOver={(event)=>event.preventDefault()} onDragStart={(event)=>event.dataTransfer.setData("transfer",event.target.closest(".wrp_card").id+","+event.target.parentNode.closest(".wrp_list").id)}>
		<h4>
			{props.cardName}
			<button className="btn btn-danger btn_card_delete" type="button" onClick ={(elem)=>{props.deleteCard(elem.target.parentNode.closest(".wrp_card").id,elem.target.parentNode.closest(".wrp_list").id)}}>Delete Card</button>
		</h4>
		<input type="text" placeholder="Card description" defaultValue={props.cardDesc} onChange = {(elem)=>{props.updateDesc(elem.target.value,elem.target.parentNode.closest(".wrp_card").id,elem.target.parentNode.closest(".wrp_list").id);}}/><br/>
		<textarea id="xxx"></textarea><br/>
		<button class="btn btn-warning" type="button" onClick={(elem)=>{props.addComment(elem.target.previousElementSibling.previousElementSibling.value,elem.target.parentNode.closest(".wrp_card").id,elem.target.parentNode.closest(".wrp_list").id);elem.target.previousElementSibling.previousElementSibling.value="";}}>Add Comment</button>
		{props.cardComments.map(function(name, index){
		return <div key={index} className="txt_comments">
				{name}
			</div>
			})}
		
	</div>
	);
export default CardComponent;