var items = new Array(4);

var count = 0,
	score = 0,
	successMoving = false;

function Item(x, y, id, value) {
	this.x = x;
	this.y = y;
	this.id = "item_" + id;
	this.v = value
	this.init();
}

Item.prototype.init = function() {
	var elem = document.createElement("div");
	elem.className = "item item_" + this.v + " x" + this.x +" y" + this.y;
	elem.id = this.id;
	elem.innerHTML = this.v;
	document.getElementById("container").appendChild(elem);

	items[this.x][this.y] = this;
};

Item.prototype.move = function(x, y) {
	items[this.x][this.y] = false;

	this.x = x; 
	this.y = y;

	document.getElementById(this.id).className = "item item_" + this.v + " x" + x +" y" + y;

	items[x][y] = this;
};

Item.prototype.equals = function(other) {
	return this.v == other.v;
};

Item.prototype.remove = function() {
	document.getElementById("container").removeChild(document.getElementById(this.id));

	items[this.x][this.y] = false;

	delete this;
};

window.onload = function() {

	for (var i = 0; i < 4; ++i) {
		items[i] = new Array(4);
		for (var j = 0; j < 4; ++j) {
			items[i][j] = false;
		}
	}

	generateNewItem();
	generateNewItem();
};

keys = {
	left: 37,
	up: 38,
	right: 39,
	down: 40
}

window.onkeydown = function(e) {

	switch (e.keyCode) {
		case keys.left:
			for (var x = 0; x < 4; ++x)
				for (var y = 0; y < 4; ++y)
					if (items[x][y] != false)
						doMove(-1, 0, x, y);

			break;

		case keys.right:
			for (var x = 3; x >= 0; --x)
				for (var y = 3; y >= 0; --y)
					if (items[x][y] != false)
						doMove(1, 0, x, y);
			break;

		case keys.up:
			for (var y = 0; y < 4; ++y)
				for (var x = 0; x < 4; ++x)
					if (items[x][y] != false)
						doMove(0, -1, x, y);
			break;

		case keys.down:
			for (var y = 3; y >= 0; --y)
				for (var x = 3; x >= 0; --x)
					if (items[x][y] != false)
						doMove(0, 1, x, y);
			break;
	}
	if (e.keyCode == keys.left || e.keyCode == keys.right || e.keyCode == keys.up || e.keyCode == keys.down) {
		if (successMoving) {
			setTimeout(function() {
				generateNewItem();
			}, 300);
			successMoving = false;
		}
		for (var i = 0; i < 4; ++i)
			for (var j = 0; j < 4; ++j)
				if (items[i][j] && items[i][j].v >= 2048) alert("Поздравляю! Вы победили!");
	}
}

function doMove(kx, ky, x, y) {
	var x0 = x, y0 = y;
	var item = items[x][y],
		temp,
		eq = false;

	if (kx != 0) {
		while ( (x > 0 && kx == -1) || (x < 3 && kx == 1) ) {
			if (!items[x+kx][y]) {
				x += kx;
				successMoving = true;
			}
			else if ( item.equals(items[x + kx][y]) ) {
				eq = true;
				x += kx;
				temp = items[x][y];
				break;
			}
			else break;
		}
	}
	else if (ky != 0) {
		while ( (y > 0 && ky == -1) || (y < 3 && ky == 1) ) {
			if (!items[x][y+ky]) {
				y += ky;
				successMoving = true;
			}
			else if ( item.equals(items[x][y + ky]) ) {
				eq = true;
				y += ky;
				temp = items[x][y];
				break;
			}
			else break;
		}
	}
	item.move(x, y);

	if (eq) {
		var v = item.v;
		item.remove();
		temp.remove();
		new Item(x, y, count++, v * 2);

		score += v*2;
		document.getElementById("score").innerHTML = score;

		successMoving = true;
	}
}

function generateNewItem() {
	var x, y;
	do {
		x = Math.floor(Math.random() * 4);
		y = Math.floor(Math.random() * 4);
	} while (items[x][y] != false)

	var v = (Math.random() < 0.8) ? 2 : 4;

	new Item(x, y, count++, v);
}