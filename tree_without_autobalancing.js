Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    value: function (itemToRemove) {
        var removeCounter = 0;
        for (var index = 0; index < this.length; index++) {
            if (this[index] === itemToRemove) {
                this.splice(index, 1);
                removeCounter++;
                index--;
            }
        }
        return removeCounter;
    }
});

function BadBalancedTree(n) {
	this.left = null;
	this.right = null;
	this.node = n;
	this.elements = [n];
}
 
BadBalancedTree.prototype.build = function(elements, start, end) {
	
	var mid = parseInt((start + end) / 2);
	this.node = elements[mid];

	this.left = build(elements, start, mid - 1);
	this.right = build(elements, mid + 1, end);

	return this;
};

function build(elements, start, end) {
	if (start > end) return null;

	var mid = parseInt((start + end) / 2);

	var el = new BadBalancedTree(elements[mid]);
	el.elements = elements;
	el.left = build(elements, start, mid - 1);
	el.right = build(elements, mid + 1, end);

	return el;
}

BadBalancedTree.prototype.add = function(n)  {
	this.elements.push(n);
	this.elements.sort(function(a,b) { return a - b });

	return this.build(this.elements, 0, this.elements.length);
};

BadBalancedTree.prototype.remove = function(n) {
	this.elements.remove(n)
	console.log(this.elements);

	return this.build(this.elements, 0, this.elements.length);
};

BadBalancedTree.prototype.find = function(n) {
	if (n < this.node && this.left)
		this.left.find(n);
	else if (n > this.node && this.right)
		this.right.find(n);
	else if (n == this.node)
		console.log("Find: " + this.node);
	else
		console.log('Not found.');

};

BadBalancedTree.prototype.print = function(top, left, i) {
	var p = document.createElement('p');
	p.style.position = "absolute";
	p.style.left = left + 'px';
	p.style.top = top + 'px';
	p.innerHTML = this.node;
	p.setAttribute('title', this.node);

	document.body.appendChild(p);

	if (this.left) this.left.print(top + 30, left - 600 / i, i * 2);
	if (this.right) this.right.print(top + 30, left + 600 / i, i * 2);
};

var i = 1,
	tree,
	rtree,
	start;

window.onload = function() {
	start = Date.now();
	tree = new BadBalancedTree(0);
	while (i < 10000) tree = tree.add(i++);

	alert("Заполнение последовательными числами: " + (Date.now() - start));

	tree.print(30, document.body.offsetWidth / 2, 2);

	i = 0;
	start = Date.now();
	rtree = new BadBalancedTree(i);
	while(i < 1000) {
		rtree = rtree.add(Math.floor(Math.random()* 10000));
		++i;
	}
	alert("Заполнение рандомными числами: " + (Date.now() - start));

	i = 0;
	start = Date.now();
	while (i < 10000) {
		tree.find(Math.floor(Math.random()*10000));
		++i;
	}
	alert("Поиск: " + (Date.now() - start));
	
	document.getElementById('add_node').onclick = addAndPrint;
	document.getElementById('remove_node').onclick = removeAndPrint;
};

function addAndPrint() {
	tree = tree.add(i++);
	clr();
	tree.print(30, document.body.offsetWidth / 2, 2);
}

function removeAndPrint() {
	var input = document.getElementById('remove_input');
	tree = tree.remove(parseInt(input.value));
	clr();
	tree.print(30, document.body.offsetWidth / 2, 2);
	input.value -= 1;
}

function clr() {
	[].slice.call(document.getElementsByTagName('p')).forEach(function(e) {
		document.body.removeChild(e);
	});
}