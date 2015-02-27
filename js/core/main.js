var Main = (function(window) {
	var scripts = [
			/*'core/helper.js', */'core/class.js', 'canvas.js', 'tree/tree.js',
			'tree/avl_tree.js', 'tree/binary_tree.js', 'tree/slow_avl_tree.js'
		],
		addScripts = function(scripts) {
			for (var i in scripts) {
				var script = document.createElement('script');
				script.src = 'js/' + scripts[i];
				document.body.appendChild(script);
			}
		},
		removeAndPrint = function(tree) {
			var input = document.getElementById('remove_input');
			tree.tree.remove(input.value);
		},
		fillTable = function(times) {
			var table = qa('#table table tbody td');

			for (var i = 0; i < 4; ++i) {
				for (var j = 0; j < 3; ++j) {
					// console.log(table[i * 4 + j + 1]);
					if (table[i * 4 + j + 1]) {
						table[i * 4 + j + 1].innerHTML = times[i][j];
					}
				}
			}
		};

	return {
		init: function() {
			Main.events();
		},
		table: false,
		events: function() {
			addScripts(scripts);
			window.onload = function() {
				Canvas.init();
				Main.writePerfomance();
			};
			d('toggle_table').addEventListener('click', function(e) {
				if (Main.table)
					d('table').classList.remove('active');
				else
					d('table').classList.add('active');
				e.stopPropagation();
				Main.table = !Main.table;
			}, false);
			window.addEventListener('click', function(e) {
				if (Main.table) {
					d('table').classList.remove('active');
					Main.table = false;
				}
			}, false);
			d('table').addEventListener('click', function(e) {
				e.stopPropagation();
				return false;
			}, false);
		},
		writePerfomance: function() {
			var i = 0,
				times = [],
				addTime = [],
				randAddTime = [],
				deleteTime = [],
				tree = new AVLTree(0),
				searchTime = [],
				start = Date.now(),
				avlTree = new AVLTree(0);
			while (i < 5000) avlTree.add(i++);
			addTime.push(Date.now() - start);

			start = Date.now();
			i = 0;
			var binaryTree = new BinaryTree(0);
			while (i < 5000) binaryTree.add(i++);
			addTime.push(Date.now() - start);

			start = Date.now();
			i = 0;
			var slowAvlTree = new SlowAVLTree(0);
			while (i < 5000) slowAvlTree = slowAvlTree.add(i++);
			addTime.push(Date.now() - start);



			times.push(addTime);


			start = Date.now();
			i = 0;
			while (i < 10000){
				avlTree.add(Math.floor(Math.random()*10000));
				++i;
			}
			randAddTime.push(Date.now() - start);

			start = Date.now();
			i = 0;
			while (i < 10000){
				binaryTree.add(Math.floor(Math.random()*10000));
				++i;
			}
			randAddTime.push(Date.now() - start);

			start = Date.now();
			i = 0;
			while (i < 10000){
				slowAvlTree = slowAvlTree.add(Math.floor(Math.random()*10000));
				++i;
			}
			randAddTime.push(Date.now() - start);



			times.push(randAddTime);



			start = Date.now();
			i = 0;
			while (i < 10000) {
				avlTree.remove(Math.floor(Math.random()*10000));
				++i;
			}
			deleteTime.push(Date.now() - start);

			start = Date.now();
			i = 0;
			while (i < 10000) {
				binaryTree.remove(Math.floor(Math.random()*10000));
				++i;
			}
			deleteTime.push(Date.now() - start);

			start = Date.now();
			i = 0;
			while (i < 10000) {
				slowAvlTree = slowAvlTree.remove(Math.floor(Math.random()*10000));
				++i;
			}
			deleteTime.push(Date.now() - start);



			times.push(deleteTime);



			start = Date.now();
			i = 0;
			while (i < 10000) {
				avlTree.find(Math.floor(Math.random()*10000));
				++i;
			}
			searchTime.push(Date.now() - start);

			start = Date.now();
			i = 0;
			while (i < 10000) {
				binaryTree.find(Math.floor(Math.random()*10000));
				++i;
			}
			searchTime.push(Date.now() - start);

			start = Date.now();
			i = 0;
			while (i < 10000) {
				slowAvlTree.find(Math.floor(Math.random()*10000));
				++i;
			}
			searchTime.push(Date.now() - start);



			times.push(searchTime);

			fillTable(times);

			for (i = 0; i < 50; ++i) tree.add(i);
			tree.print(30, document.body.offsetWidth / 2, 2);
		}
	}
})(window);

Main.init();