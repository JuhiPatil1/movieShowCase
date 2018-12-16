import { searchQuery } from './calls.js';
import { constants,url } from './constants'
import '../css/style.scss';


document.addEventListener('readystatechange',function(e){
	let data=[];
	let loading=false;
	var edit=null;
	const appContent=document.getElementById('app-content');
	const cardList=document.getElementById('card-list');
	window.onDelete=function(id){
		data=data.filter(d=>d.id!==id);
		generateList(data);
	}
	window.onEdit=function(e){
		edit=e;
		generateList(data);
	}
	window.onCancel=function(e){
		edit=null;
		generateList(data);
	}
	window.onSave=function(e){
		const title=document.getElementById('edit-title').value;
		const year=document.getElementById('edit-year').value;
		if(title.length && year && !isNaN(parseInt(year))){
			data=data.map(d=>{
				if(d.id===edit){
					let date=d.release_date.split('-')
					date[0]=year
					return Object.assign(d,{
						title,
						release_date:date.join('-'),
					})
				}
				return d;
			})
			edit=null;
			generateList(data);
		}
	}
	window.onSearch=function(){
		let query = document.getElementById('myInput').value;
		if(query.length==0){
			query="a";

		}
		appContent.classList.add(constants.LOADING);
		searchQuery(query,function(response){
			data=response.results;
			generateList(data)
			appContent.classList.remove(constants.LOADING);	
		})

	}

	function generateCard(data){
		if(edit!==data.id){
			return `
				<div class="column">
		      		<div class="card" style="background-image:url(${url.poster}${data.poster_path});">
		      			<div class="movie-poster"  alt="${data.title}">
		      			</div>
		      			<div class="movie-content">
			        		<h3>${data.title}</h3>
			        		<span>${data.release_date.split('-')[0]}</span>
		      			</div>
		        		<div class="btn-group">
		          			<button onclick=onEdit(${data.id}) class="btn btn-edit" data-id=${data.id} title="Edit">
		          				<i class="material-icons">edit</i>
		          			</button>
		          			<button onclick=onDelete(${data.id}) class="btn btn-delete" data-id=${data.id} title="Delete">
		          				<i class="material-icons">delete</i>
		          			</button>
		        		</div>
		      		</div>
		    	</div>`
		}
		else{
			return `
				<div class="column">
		      		<div class="card" style="background-image:url(${url.poster}${data.poster_path});">
		      			<div class="movie-poster" alt="${data.title}">
		      			</div>
		      			<div class="movie-content">
			        		<input type='text' id="edit-title" autofocus value="${data.title}"/>
			        		<input type='text' id="edit-year" value=${data.release_date.split('-')[0]} />
		      			</div>
		        		<div class="btn-group">
		          			<button class="btn btn-edit" onclick=onSave() data-id=${data.id} title="Save">
		          				<i class="material-icons">save</i>
		          			</button>
		          			<button class="btn btn-delete" onclick=onCancel() data-id=${data.id}  title="Cancel">
		          				<i class="material-icons">cancel</i>
		          			</button>
		        		</div>
		      		</div>
		    	</div>`
		}
	}
	function generateList(list){
		cardList.innerHTML=list.map(generateCard).join('\n')
	}
	function initApp(){
		appContent.classList.add(constants.LOADING);
		searchQuery('a',function(response){
			data=response.results;
			generateList(data)
			appContent.classList.remove(constants.LOADING);	
		})
	}
	if(e.target.readyState === 'complete'){
		initApp();
	}
})

console.log('media.net')