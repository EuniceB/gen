let families = [];
let timeStopped = true;
setInterval(function(){
	if(!timeStopped && families.length>0){
		advance1Year();
	}
},200);

function advance1Year(){
	for(var key in families){
		let f = families[key];
		f.mom.age1Year();
		f.dad.age1Year();
		for(let c of f.children){
			c.age1Year();
		}
	}
	updateDOMList();
}

function play(){
	timeStopped = false;
}

function newHuman(){
	let human = HumanGenerator.generateAdult();
	if(human.gender){
		families[Math.round(Math.random()*100000000)] = {
			mom: human,
			dad: null,
			children: []
		}
	}else{
		families[Math.round(Math.random()*100000000)] = {
			dad: human,
			mom: null,
			children: []
		}
	}
	
}

function newFamily(){
	let male = HumanGenerator.generateAdult(false);
    let female = HumanGenerator.generateAdult(true);
    let children = male.reproduceWith(female);
    families[Math.round(Math.random()*100000000)] = {
    	mom: female,
    	dad: male,
    	children: children
    }
    updateDOMList();
}

function updateDOMList(){
	let list = document.getElementById("families");
	list.innerHTML = "";
	for(var key in families){
		let f = families[key];
		let li = document.createElement("li");
		let dadP = "<p>Dad: "+f.dad.toString()+"</p>";
		let momP = "<p>Mom: "+f.mom.toString()+"</p>";
		let childrenP = "<ul>";
		for(let c of f.children){
			childrenP += "<li>"+c.toString()+"</li>"
		}
		childrenP +="</ul>";
		let tryForABabyButton = "<button data-family="+key+" onClick='tryForABaby(event)'>Try for a baby</button>"
		li.innerHTML = dadP+momP+childrenP+tryForABabyButton;
		list.appendChild(li);
	}
}

function tryForABaby(event){
	console.log("New baby!")
	let familyId = event.target.dataset.family;
	let male = families[familyId].dad;
    let female = families[familyId].mom;
    let children = male.reproduceWith(female);
    if(children.length>0){
    	families[familyId].children = families[familyId].children.concat(children);
    	updateDOMList();
	}
}

