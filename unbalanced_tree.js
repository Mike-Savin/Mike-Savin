function UnbalancedTree(n) {
	this.left = null;
	this.right = null;
	this.node = n;
}

UnbalancedTree.prototype.add = function(n)  {
	var o = n - this.node;

	if (o <= -1) {
		if (this.left == null) {
			this.left = new UnbalancedTree(n);
		}
		else {
			this.left.add(n);
		}
	}
	else if (o >= 1) {
		if (this.right == null) {
			this.right = new UnbalancedTree(n);
		}
		else {
			this.right.add(n);
		}
	}
};

UnbalancedTree.prototype.remove = function(n) {
	var o = n - this.node;

	if (o <= -1) {
		if (this.left && this.left.node == n)
			this.left = null;
		else
			this.left.remove(n);
	}
	else if (o >= 1) {
		if (this.right && this.right.node == n)
			this.right = null;
		else
			this.right.remove(n);
	}
};

UnbalancedTree.prototype.print = function(top, left, i) {
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

UnbalancedTree.prototype.find = function(n) {
	if (isNaN(n)) return;

	if (n < this.node && this.left)
		this.left.find(n);
	else if (n > this.node && this.right)
		this.right.find(n);
	else if (n == this.node)
		console.log("Find: " + this.node);
	else
		console.log('Not found.');

};

var i = 1,
	tree,
	rtree,
	start;

window.onload = function() {
	start = Date.now();
	tree = new UnbalancedTree(i);
	while (i < 1000) {
		tree.add(++i);
	}
	alert("Заполнение последовательными числами (1000): " + (Date.now() - start));

	i = 0;
	start = Date.now();
	rtree = new UnbalancedTree(Math.floor(Math.random() * 10000));
	while(i < 1000) {
		rtree.add(Math.floor(Math.random()* 10000));
		++i;
	}
	alert("Заполнение рандомными числами: " + (Date.now() - start));

	rtree.print(30, document.body.offsetWidth / 2, 2);

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
	rtree.add(i++);
	clr();
	rtree.print(30, document.body.offsetWidth / 2, 2);
}

function removeAndPrint() {
	var input = document.getElementById('remove_input');
	rtree.remove(parseInt(input.value));
	clr();
	rtree.print(30, document.body.offsetWidth / 2, 2);
	input.value -= 1;
}

function clr() {
	[].slice.call(document.getElementsByTagName('p')).forEach(function(e) {
		document.body.removeChild(e);
	});
}