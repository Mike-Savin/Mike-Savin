var Tree = new Class();

Tree.include({
	init: function(n) {
		this.left = null;
		this.right = null;
		this.node = n;
		this.depth = 1;
	},
	print: function(top, left, i) {
		Canvas.drawNode(left, top, this.node);

		if (this.left) {
			Canvas.drawLine(left, top, left - 600 / i, top + 50);
			this.left.print(top + 50, left - 600 / i, i * 2);
		}
		if (this.right) {
			Canvas.drawLine(left, top, left + 600 / i, top + 50);
			this.right.print(top + 50, left + 600 / i, i * 2);
		}
	},
	find: function(n) {
		if (isNaN(n)) return;

		if (n < this.node && this.left)
			this.left.find(n);
		else if (n > this.node && this.right)
			this.right.find(n);
		else if (n == this.node)
			console.log("Find: " + this.node);
		else
			console.log('Not found.');
	}
});
