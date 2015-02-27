var SlowAVLTree = new Class(Tree);

SlowAVLTree.include({
	init: function(n) {
		this.node  = n;
		this.left  = null;
		this.right = null;
		this.elements = [n];
	},
	rebuild: function(elements, start, end) {
		var mid   = parseInt((start + end) / 2);
		this.node = elements[mid];

		this.left  = this.build(elements, start, mid - 1);
		this.right = this.build(elements, mid + 1, end);

		return this;
	},
	build: function(elements, start, end) {
		if (start > end) return null;

		var mid = parseInt((start + end) / 2),
			el  = new SlowAVLTree(elements[mid]);
		el.elements = elements;
		el.left  = this.build(elements, start, mid - 1);
		el.right = this.build(elements, mid + 1, end);

		return el;
	},
	add: function(n)  {
		this.elements.push(n);
		this.elements.sort(function(a, b) { return a - b });

		return this.rebuild(this.elements, 0, this.elements.length);
	},
	remove: function(n) {
		this.elements.remove(n)
		console.log(this.elements);

		return this.rebuild(this.elements, 0, this.elements.length);
	}
});