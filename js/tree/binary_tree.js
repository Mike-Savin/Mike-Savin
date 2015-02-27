var BinaryTree = new Class(Tree);

BinaryTree.include({
	init: function(n) {
		this.left = null;
		this.right = null;
		this.node = n;
	},
	add: function(n)  {
		var o = n - this.node;
		if (o <= -1) {
			if (this.left == null)
				this.left = new BinaryTree(n);
			else
				this.left.add(n);
		}
		else if (o >= 1) {
			if (this.right == null)
				this.right = new BinaryTree(n);
			else
				this.right.add(n);
		}
	},
	remove: function(n) {
		var o = n - this.node;
		if (o <= -1) {
			if (this.left) {
				if (this.left.node == n)
					this.left = null;
				else
					this.left.remove(n);
			}
		}
		else if (o >= 1) {
			if (this.right) {
				if (this.right.node == n)
					this.right = null;
				else
					this.right.remove(n);
			}
		}
	}
});