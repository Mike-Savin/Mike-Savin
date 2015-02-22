function AVLTree(n) {
    this.init(n);
}
 
AVLTree.prototype.init = function(n) {
    this.left = null;
    this.right = null;
    this.node = n;
    this.depth = 1;
};
 
AVLTree.prototype.balance = function() {
    var ldepth = this.left  == null ? 0 : this.left.depth;
    var rdepth = this.right == null ? 0 : this.right.depth;
 
    if (ldepth > rdepth + 1) {
        // LR or LL rotation
        var lldepth = this.left.left  == null ? 0 : this.left.left.depth;
        var lrdepth = this.left.right == null ? 0 : this.left.right.depth;
 
        if (lldepth < lrdepth) {
            // LR rotation consists of a RR rotation of the left child
            this.left.rotateRR();
            // plus a LL rotation of this node, which happens anyway
        }
        this.rotateLL();
    } else if (ldepth + 1 < rdepth) {
        // RR or RL rorarion
        var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
        var rldepth = this.right.left  == null ? 0 : this.right.left.depth;
 
        if (rldepth > rrdepth) {
            // RR rotation consists of a LL rotation of the right child
            this.right.rotateLL();
            // plus a RR rotation of this node, which happens anyway
        }
        this.rotateRR();
    }
};
 
AVLTree.prototype.rotateLL = function() {
    // the left side is too long => rotate from the left (_not_ leftwards)
    var nodeBefore = this.node;
    var rightBefore = this.right;
    this.node = this.left.node;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.node = nodeBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
};
 
AVLTree.prototype.rotateRR = function() {
    // the right side is too long => rotate from the right (_not_ rightwards)
    var nodeBefore = this.node;
    var leftBefore = this.left;
    this.node = this.right.node;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.node = nodeBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
};
 
AVLTree.prototype.updateInNewLocation = function() {
    this.getDepthFromChildren();
};
 
AVLTree.prototype.getDepthFromChildren = function() {
    this.depth = this.node == null ? 0 : 1;
    if (this.left != null) {
        this.depth = this.left.depth + 1;
    }
    if (this.right != null && this.depth <= this.right.depth) {
        this.depth = this.right.depth + 1;
    }
};
 
AVLTree.prototype.add = function(n)  {
    var o = Math.abs(n - this.node)
    if (o == 0) {
        return false;
    }
 
    var ret = false;
    if (o <= -1) {
        if (this.left == null) {
            this.left = new AVLTree(n);
            ret = true;
        } else {
            ret = this.left.add(n);
            if (ret) {
                this.balance();
            }
        }
    } else if (o >= 1) {
        if (this.right == null) {
            this.right = new AVLTree(n);
            ret = true;
        } else {
            ret = this.right.add(n);
            if (ret) {
                this.balance();
            }
        }
    }
 
    if (ret) {
        this.getDepthFromChildren();
    }
    return ret;
};

AVLTree.prototype.print = function(top, left, i) {
	var p = document.createElement('p');
	p.style.position = "absolute";
	p.style.left = left + 'px';
	p.style.top = top + 'px';
	p.innerHTML = this.node;

	document.body.appendChild(p);

	if (this.left != null && this.left.node) this.left.print(top + 30, left - 600 / i, i*2);
	if (this.right != null && this.right.node) this.right.print(top + 30, left + 600 / i, (i*2));
};

var i = 11,
	tree = new AVLTree(10);

window.onload = function() {
	while (i < 49)
		tree.add(i++);
	tree.print(30, document.body.offsetWidth / 2, 2);
	document.getElementById('add_node').onclick = addAndPrint;
};

function addAndPrint() {
	tree.add(i++);
	clr();
	tree.print(30, document.body.offsetWidth / 2, 2);
}

function clr() {
	[].slice.call(document.getElementsByTagName('p')).forEach(function(e) {
		document.body.removeChild(e);
	});
}