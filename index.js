let families = {};
let timeStopped = true;
setInterval(function () {
  if (!timeStopped && Object.keys(families).length > 0) {
    advance1Year();
  }
}, 200);

function advance1Year() {
	console.log("Advance 1 year")
  for (let key in families) {
    let f = families[key];
    if (f.mom) {
      f.mom.age1Year();
    }
    if (f.dad) {
      f.dad.age1Year();
    }
    for (let c of f.children) {
      c.age1Year();
    }
  }
  updateDOMList();
}

function play() {
  timeStopped = false;
}

function newHuman() {
  let human = HumanGenerator.generateAdult(
    Math.random() > 0.5 ? true : false,
    generateHEXColor()
  );
  const id = Object.keys(families).length;
  if (human.gender) {
    families[id] = {
      mom: human,
      dad: null,
      children: [],
    };
  } else {
    families[id] = {
      dad: human,
      mom: null,
      children: [],
    };
  }
  updateDOMList();
}

function newFamily() {
  const color = generateHEXColor();
  const id = Object.keys(families).length;
  let male = HumanGenerator.generateAdult(false, color);
  let female = HumanGenerator.generateAdult(true, color);
  let children = male.reproduceWith(female);
  families[id] = {
    mom: female,
    dad: male,
    children,
  };
  updateDOMList();
}

function updateDOMList() {
  let list = document.getElementById("families");
  list.innerHTML = "";
  for (let key in families) {
    let f = families[key];
    console.log(f);
    let li = document.createElement("li");
    let momP, dadP;
    if (f.dad) {
      dadP = "<p>Dad: " + f.dad.toString() + "</p>";
    }
    if (f.mom) {
      momP = "<p>Mom: " + f.mom.toString() + "</p>";
    }
    let childrenP = "<ul>";
    for (let c of f.children) {
      childrenP += "<li>" + c.toString() + "</li>";
    }
    childrenP += "</ul>";
    let tryForABabyButton =
      "<button data-family=" +
      key +
      " onClick='tryForABaby(event)'>Try for a baby</button>";
    if (f.dad) {
      li.innerHTML += dadP;
    }
    if (f.mom) {
      li.innerHTML += momP;
    }
    li.innerHTML += childrenP;
	if(f.dad && f.mom && !f.dad.dead && !f.mom.dead){
		li.innerHTML += tryForABabyButton
	}
	li.innerHTML += "<hr>";
    list.appendChild(li);
  }
}

function tryForABaby(event) {
  let familyId = event.target.dataset.family;
  let male = families[familyId].dad;
  let female = families[familyId].mom;
  let children = male.reproduceWith(female);
  if (children.length > 0) {
    families[familyId].children = families[familyId].children.concat(children);
    updateDOMList();
  }
}
