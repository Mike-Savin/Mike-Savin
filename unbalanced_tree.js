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

var i = 1,
	tree,
	start;

window.onload = function() {
	start = Date.now();
	tree = new UnbalancedTree(Math.floor(Math.random() * 10000));
	while (i < 10000) {
		tree.add(Math.floor(Math.random() * 10000));
		++i;
	}
	tree.print(30, document.body.offsetWidth / 2, 2);

	alert(Date.now() - start);
	
	document.getElementById('add_node').onclick = addAndPrint;
	document.getElementById('remove_node').onclick = removeAndPrint;
};

function addAndPrint() {
	tree.add(i++);
	clr();
	tree.print(30, document.body.offsetWidth / 2, 2);
}

function removeAndPrint() {
	var input = document.getElementById('remove_input');
	tree.remove(parseInt(input.value));
	clr();
	tree.print(30, document.body.offsetWidth / 2, 2);
	input.value -= 1;
}

function clr() {
	[].slice.call(document.getElementsByTagName('p')).forEach(function(e) {
		document.body.removeChild(e);
	});
}