function Tree(n) {
	this.init(n);
}
 
Tree.prototype.init = function(n) {
	this.left = null;
	this.right = null;
	this.node = n;
	this.depth = 1;
};
 
Tree.prototype.balance = function() {
	this.getDepth();
	var ldepth = this.left  == null ? 0 : this.left.depth,
		rdepth = this.right == null ? 0 : this.right.depth;
 
	if (ldepth > rdepth + 1) {
		var lldepth = this.left.left  == null ? 0 : this.left.left.depth,
			lrdepth = this.left.right == null ? 0 : this.left.right.depth;
 
		if (lldepth < lrdepth) this.left.rotateRight();
		this.rotateLeft();
	}
	else if (ldepth + 1 < rdepth) {
		var rrdepth = this.right.right == null ? 0 : this.right.right.depth,
			rldepth = this.right.left  == null ? 0 : this.right.left.depth;
 
		if (rldepth > rrdepth) this.right.rotateLeft();
		this.rotateRight();
	}
};
 
Tree.prototype.rotateLeft = function() {
	var nodeBefore = this.node,
		rightBefore = this.right;
	this.node = this.left.node;
	this.right = this.left;
	this.left = this.left.left;
	this.right.left = this.right.right;
	this.right.right = rightBefore;
	this.right.node = nodeBefore;
	this.right.getDepth();
	this.getDepth();
};
 
Tree.prototype.rotateRight = function() {
	var nodeBefore = this.node,
		leftBefore = this.left;
	this.node = this.right.node;
	this.left = this.right;
	this.right = this.right.right;
	this.left.right = this.left.left;
	this.left.left = leftBefore;
	this.left.node = nodeBefore;
	this.left.getDepth();
	this.getDepth();
};

Tree.prototype.getDepth = function() {
	this.depth = this.node == null ? 0 : 1;
	if (this.left)
		this.depth = this.left.depth + 1;

	if (this.right && this.depth <= this.right.depth)
		this.depth = this.right.depth + 1;
};
 
Tree.prototype.add = function(n)  {
	var o = n - this.node,
		ret = false;

	if (o <= -1) {
		if (this.left == null) {
			this.left = new Tree(n);
			ret = true;
		}
		else {
			ret = this.left.add(n);
			if (ret) this.balance();
		}
	}
	else if (o >= 1) {
		if (this.right == null) {
			this.right = new Tree(n);
			ret = true;
		}
		else {
			ret = this.right.add(n);
			if (ret) this.balance();
		}
	}
 
	if (ret) this.getDepth();
	return ret;
};

Tree.prototype.replace = function(n) {
	if (!n) {
		this.node = null;
		return;
	}
	this.node = n.node;
	this.right = n.right;
	this.left = n.left;
	n = null;
};

Tree.prototype.replaceMin = function(n) {
	if (!n) {
		this.node = null;
		return;
	}
	this.node = n.node;
	this.right = n.right;
	n = null;
};

Tree.prototype.findMin = function() {
	return this.left ? this.left.findMin() : this;
};

Tree.prototype.remove = function(n) {
	if (n < this.node && this.left) {
		if (n == this.left.node) {
			if (this.left.left && this.left.right)
				this.left.replaceMin(this.left.right.findMin());
			else if (this.left.left)
				this.left = this.left.left;
			else
				this.left = this.left.right;
			if (this.left) this.left.balance();
		}
		else this.left.remove(n);
	}
	else if (n > this.node && this.right) {
		if (n == this.right.node) {
			if (this.right.left && this.right.right) 
				this.right.replaceMin(this.right.right.findMin());
			else if (this.right.left)
				this.right = this.right.left;
			else
				this.right = this.right.right;
			if (this.right) this.right.balance();
		}
		else this.right.remove(n);
	}
	else {
		var l = this.left,
			r = this.right;

		if (!r) {
			this.replace(this.left);
			this.getDepth();
			return;
		}
	}
	this.getDepth();
	this.balance();
};

Tree.prototype.print = function(top, left, i) {
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
	tree = new Tree(0);
	while (i < 10000) tree.add(i++);
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
	tree.remove(input.value);
	clr();
	tree.print(30, document.body.offsetWidth / 2, 2);
	input.value -= 1;
}

function clr() {
	[].slice.call(document.getElementsByTagName('p')).forEach(function(e) {
		document.body.removeChild(e);
	});
}