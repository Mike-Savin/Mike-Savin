var AVLTree = new Class(Tree);

AVLTree.include({
	init: function(n) {
		this.left = null;
		this.right = null;
		this.node = n;
		this.depth = 1;
	},
	balance: function() {
	    var ldepth = this.left  == null ? 0 : this.left.depth;
	    var rdepth = this.right == null ? 0 : this.right.depth;
	 
	    if (ldepth > rdepth + 1) {
	        var lldepth = this.left.left  == null ? 0 : this.left.left.depth;
	        var lrdepth = this.left.right == null ? 0 : this.left.right.depth;
	 
	        if (lldepth < lrdepth) {
	            this.left.rotateRR();
	        }
	        this.rotateLL();
	    } else if (ldepth + 1 < rdepth) {
	        var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
	        var rldepth = this.right.left  == null ? 0 : this.right.left.depth;
	 
	        if (rldepth > rrdepth) {
	            this.right.rotateLL();
	        }
	        this.rotateRR();
	    }
	},
	rotateLL: function() {
	    var nodeBefore = this.node;
	    var rightBefore = this.right;
	    this.node = this.left.node;
	    this.right = this.left;
	    this.left = this.left.left;
	    this.right.left = this.right.right;
	    this.right.right = rightBefore;
	    this.right.node = nodeBefore;
	    this.right.getDepth();
	    this.getDepth();
	},
	rotateRR: function() {
	    var nodeBefore = this.node;
	    var leftBefore = this.left;
	    this.node = this.right.node;
	    this.left = this.right;
	    this.right = this.right.right;
	    this.left.right = this.left.left;
	    this.left.left = leftBefore;
	    this.left.node = nodeBefore;
	    this.left.getDepth();
	    this.getDepth();
	},
	getDepth: function() {
	    this.depth = this.node == null ? 0 : 1;
	    if (this.left != null)
	        this.depth = this.left.depth + 1;
	    if (this.right != null && this.depth <= this.right.depth)
	        this.depth = this.right.depth + 1;
	},
	add: function(n)  {
		var o = n - this.node,
			ret = false;

		if (o <= -1) {
			if (this.left == null) {
				this.left = new AVLTree(n);
				ret = true;
			}
			else {
				ret = this.left.add(n);
				if (ret) this.balance();
			}
		}
		else if (o >= 1) {
			if (this.right == null) {
				this.right = new AVLTree(n);
				ret = true;
			}
			else {
				ret = this.right.add(n);
				if (ret) this.balance();
			}
		}
	 
		if (ret) this.getDepth();
		return ret;
	},
	replace: function(n) {
		if (!n) {
			this.node = null;
			return;
		}
		this.node = n.node;
		this.right = n.right;
		this.left = n.left;
		n = null;
	},
	replaceMin: function(n) {
		if (!n) {
			this.node = null;
			return;
		}
		this.node = n.node;
		this.right = n.right;
		n = null;
	},
	findMin: function() {
		return this.left ? this.left.findMin() : this;
	},
	remove: function(n) {
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
	}
});