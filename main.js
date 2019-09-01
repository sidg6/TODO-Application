var modal = document.getElementsByClassName("modal")[0];
var closebtn = document.getElementById("closeBtn");
var globalId="";

function saveDataModal(){
	var element = document.getElementsByClassName("modal")[0];
	element.id="myModalData";
	modal.style.display="block";
	var textarea = document.getElementsByTagName("textarea")[0];
	textarea.id= "saveData";
	document.getElementById("heading").innerHTML = "Enter the text you want to keep";
	document.getElementsByClassName("closeBtn")[0].addEventListener("click",closeModal);

}

function keepData(note){
		var size = localStorage.length;
		localStorage.setItem("data"+size,note);
		location.reload();
}

function updateKeepData(note, id){
	// if(id==0){
	// 	localStorage.setItem("data",note);
	// 	location.reload();
	// }else{
		localStorage.setItem("data"+id,note);
		location.reload();
	// }
}


function openSearchDataModal(){
	var element = document.getElementsByClassName("modal")[0];
	element.id="myModalSearch";
	modal.style.display="block";
	document.getElementById("heading").innerHTML = "Enter the text you want to search";
	document.getElementsByClassName("closeBtn")[0].addEventListener("click",close); 
	var textarea = document.getElementsByTagName("textarea")[0];
	textarea.id= "searchData";
	document.getElementById("searchData").addEventListener("input",searchMyData);
}

function searchMyData(){
	var data = document.getElementsByTagName("li");
	if(data.length>0){
		if(document.getElementById("result") == undefined && document.getElementById("searchData").value!= ""){
			document.getElementById("searchData").insertAdjacentHTML("afterend","<div id=\"result\" style=\"max-height:100%\"></div>");
		}
		var readData=[];
		for(let i=0;i<data.length;i++){
			readData[i] = data[i].innerText;
		}
		if(document.getElementById("searchData").value!= ""){
			var searchFor = document.getElementById("searchData").value;
			if(document.getElementsByClassName("error-message")[0]!=undefined){
				document.getElementsByClassName("modal-body")[0].removeChild(document.getElementsByClassName("error-message")[0]);
			}
			findData(readData,searchFor);
		}else if(document.getElementById("searchData").value == "" && document.getElementsByClassName("error-message")[0] != undefined){
			document.getElementsByClassName("error-message")[0].innerHTML = "Please enter the text you want to search";
		}else{
			if(document.getElementById("result").childNodes !=null){
				document.getElementById("result").remove();
				document.getElementById("searchData").insertAdjacentHTML("afterend","<span class=\"error-message\" style=\"color:#fff;\">Please enter the text you want to search</span>");
			}
		}
	}else if(document.getElementById("searchData").value == "" && document.getElementsByClassName("error-message")[0] != undefined){
		document.getElementsByClassName("error-message")[0].innerHTML = "";
	}else{
		if(document.getElementsByClassName("error-message")[0] == undefined){
			if(document.getElementById("result") != null){
				document.getElementById("result").remove();
			}
			document.getElementById("searchData").insertAdjacentHTML("afterend","<span class=\"error-message\">No result found</span>");
		}else{
			if(document.getElementById("result") != null){
				document.getElementById("result").remove();
			}
			document.getElementsByClassName("error-message")[0].innerHTML = "No result found";
		}
	}
	
}

function findData(data ,e){
	if(e !=null){
		var result, matchedData=[],k=0,printResult=[];
		for(let i=0;i<data.length;i++){
			result = data[i].toLowerCase().includes(e.toLowerCase());
			if(result){
				matchedData[k] = data[i];
				k++;
			}
		}
		for(let j=0;j<matchedData.length;j++){
			printResult += "<span class=\"search-results\" style=\"color:#fff; margin:20px 20px;\">"+matchedData[j]+"</span></br>";
		}
		if(printResult.length>0){
			document.getElementById("result").innerHTML = "<span> <h3 style=\"margin:0px 0px\">Search Results:</h3> </span></br>"+printResult;
			document.getElementById("result").style.padding = "0px 20px 40px 0px";
		}else{
			if(document.getElementById("result") != null){
				document.getElementById("result").remove();
			}
			document.getElementById("searchData").insertAdjacentHTML("afterend","<span class=\"error-message\">No result found</span>");
		}
	}
}


function closeModalByClickingOutside(e){
	var mymodaldata = document.getElementById("myModalData");
	var mymodalsearch = document.getElementById("myModalSearch");
	var myeditmodal = document.getElementById("myModalEditData");
	var mydeletemodal = document.getElementById("myModaldeleteData");
	
	if(mymodaldata != undefined){
		if(e.target == mymodaldata){
			mymodaldata.style.display = "none";
			if(document.getElementById("saveData").value!= ""){
				keepData(document.getElementById("saveData").value);
			}
		}
	}if(mymodalsearch != undefined){
		if(e.target == mymodalsearch){
			var childs = document.getElementsByClassName("modal-body")[0];
				console.log(childs.childNodes.length);
				while (childs.childNodes.length>2) {
				    childs.removeChild(childs.lastChild);
				}
			if(document.getElementById("searchData").value != ""){
				document.getElementById("searchData").value= "";
			}	
			mymodalsearch.style.display = "none";
			document.getElementById("searchData").removeEventListener("input",searchMyData);
			document.getElementsByClassName("closeBtn")[0].removeEventListener("click",close); 
		}
	}if(myeditmodal != undefined){
		if(e.target == myeditmodal){
			myeditmodal.style.display = "none";
			if(document.getElementById("saveEditData").value!= ""){
				updateKeepData(document.getElementById("saveEditData").value, globalId);
			}
		}
	}if(mydeletemodal != undefined){
		if(e.target == mydeletemodal){
			document.getElementsByClassName("modal-body")[0].innerHTML = "";
			var parent = document.getElementsByClassName("modal-body")[0];
			var child = document.createElement("textarea");
			parent.appendChild(child);
			document.getElementsByTagName("textarea")[0].rows = "2";
			document.getElementsByTagName("textarea")[0].cols = "1000";
			document.getElementsByTagName("textarea")[0].placeholder = "Type here.....";
			document.getElementsByClassName("modal-body")[0].style.marginTop = "";
			document.getElementsByClassName("modal-body")[0].style.marginLeft = "";
			mydeletemodal.style.display = "none";
		}
	}
}

function close(){
	var childs = document.getElementsByClassName("modal-body")[0];
	// console.log(childs.childNodes.length);
	while (childs.childNodes.length>2) {
	    childs.removeChild(childs.lastChild);
	}
	document.getElementById("searchData").value= "";
	modal.style.display = "none";
	document.getElementById("searchData").removeEventListener("input",searchMyData);
	document.getElementsByClassName("closeBtn")[0].removeEventListener("click",close); 
}

function closeModal(){
	if(document.getElementById("saveData").value!= ""){
		keepData(document.getElementById("saveData").value);
	}
	modal.style.display = "none";
}

function closeEditModal(e){
	modal.style.display = "none";
	if(document.getElementById("saveEditData").value!= ""){
		updateKeepData(document.getElementById("saveEditData").value, e);
	}
}

window.addEventListener("click",closeModalByClickingOutside);

function editData(e){
	var element = document.getElementsByClassName("modal")[0];
	element.id="myModalEditData";
	modal.style.display="block";
	var textarea = document.getElementsByTagName("textarea")[0];
	textarea.id= "saveEditData";
	document.getElementById("heading").innerHTML = "Edit Keep";
	var check =  e.split(" ");
	globalId = Number(check[1]);
	document.getElementsByClassName("closeBtn")[0].addEventListener("click",function(){closeEditModal(Number(check[1]));});
	if(Number(check[1]>0)){
		textarea.value = localStorage.getItem("data"+Number(check[1]));
	}else{
		textarea.value = localStorage.getItem("data");
	}
	
}

function closeDeleteModal(){
	document.getElementsByClassName("modal-body")[0].innerHTML = "";
	var parent = document.getElementsByClassName("modal-body")[0];
	var child = document.createElement("textarea");
	parent.appendChild(child);
	document.getElementsByTagName("textarea")[0].rows = "2";
	document.getElementsByTagName("textarea")[0].cols = "1000";
	document.getElementsByTagName("textarea")[0].placeholder = "Type here.....";
	document.getElementsByClassName("modal-body")[0].style.marginTop = "";
	document.getElementsByClassName("modal-body")[0].style.marginLeft = "";
	modal.style.display="none";
}

function deleteKeepData(e,condition){
	var check =  e.split(" ");
	var todelete = Number(check[1]);
	if(condition === "yes"){
		modal.style.display="none";
		document.getElementsByClassName("modal-body")[0].innerHTML = "";
		var parent = document.getElementsByClassName("modal-body")[0];
		var child = document.createElement("textarea");
		parent.appendChild(child);
		document.getElementsByTagName("textarea")[0].rows = "2";
		document.getElementsByTagName("textarea")[0].cols = "1000";
		document.getElementsByTagName("textarea")[0].placeholder = "Type here.....";
		document.getElementsByClassName("modal-body")[0].style.marginTop = "";
		document.getElementsByClassName("modal-body")[0].style.marginLeft = "";
		localStorage.removeItem("data"+todelete);
	}else{
		modal.style.display="none";
	}
	document.getElementById(e).remove();
	updateLocalStorageData();
	
}

function updateLocalStorageData(){
	var size = localStorage.length;
	var data= localStorage;
	var setData ={};
	var orderedKey=[];
	for(let j=0;j<size;j++){
		var key = data.key(j);
		orderedKey[j] = key;
	}
	orderedKey.sort();
	for(let i=0; i<size;i++){
		var value = data.getItem(orderedKey[i]);
		var newKey = "data"+i;
		setData[newKey] = value;
	}
	localStorage.clear();
	for(let k=0; k<size;k++){
		 var key = "data"+k;
		 localStorage.setItem(key,setData[key]);
	}
	
	location.reload();
}

function deleteData(e){
	var element = document.getElementsByClassName("modal")[0];
	element.id="myModaldeleteData";
	modal.style.display="block";
	if(document.getElementsByTagName("textarea")[0]!=undefined){
		document.getElementsByTagName("textarea")[0].remove();
	}
	document.getElementById("heading").innerHTML = "Delete";
	document.getElementById("heading").style.textAlign="Center";
	document.getElementsByClassName("modal-body")[0].innerHTML = "Are you sure you want to delete this data?";
	document.getElementsByClassName("modal-body")[0].style.marginTop = "-20px";
	document.getElementsByClassName("modal-body")[0].style.marginLeft = "40px";
	var parent = document.getElementsByClassName("modal-body")[0];
	var yesBtn = document.createElement("button");
	var noBtn = document.createElement("button");
	yesBtn.id="yesBtn";
	noBtn.id="noBtn";
	parent.appendChild(yesBtn);
	parent.appendChild(noBtn);
	document.getElementById("yesBtn").innerHTML="Yes";
	document.getElementById("yesBtn").style.top = "20px";
	document.getElementById("noBtn").innerHTML="No";
	document.getElementById("noBtn").style.top = "20px";
	document.getElementById("yesBtn").addEventListener("click",function(){deleteKeepData(e,"yes");});
	document.getElementById("noBtn").addEventListener("click",function(){deleteKeepData(e,"no");});
	document.getElementsByClassName("closeBtn")[0].addEventListener("click",closeDeleteModal);
}

function loadData(){
	if(localStorage.length>0){
		for(let i=0;i<localStorage.length;i++){
			var parent = document.getElementById("display");
			var container = document.createElement("div");
			container.id = "container "+i;
			container.className = "container";
			parent.appendChild(container);
			document.getElementById("container "+i).style.left="20vmin";
			var editIcon = document.createElement("i");
			var deleteIcon = document.createElement("i");
			editIcon.className = "fa fa-pencil";
			deleteIcon.className= "fa fa-trash";
			container.appendChild(editIcon);
			container.appendChild(deleteIcon);
			var editIconChild= document.getElementById("container "+i).children;
			var deleteIconChild= document.getElementById("container "+i).children;
			editIconChild[0].addEventListener("click",function(){editData(this.parentNode.id);});
			deleteIconChild[1].addEventListener("click",function(){deleteData(this.parentNode.id);});
			var parentChild = document.createElement("ul");
			container.appendChild(parentChild);
			parentChild.id = "updateNote"+i;
			document.getElementById("updateNote"+i).style.padding="2vmin 2vmin";
			var data = localStorage.getItem("data"+i).split("\n");
			var parentGrandChild = document.getElementById("updateNote"+i);
			for(let k=0;k<data.length;k++){
				var child = document.createElement("li");
				parentGrandChild.appendChild(child);
				child.id = "Note_"+i+k;
				document.getElementById("Note_"+i+k).innerHTML = data[k];
				document.getElementById("Note_"+i+k).style.listStyleType = "none";
			}
		}
	}
}














