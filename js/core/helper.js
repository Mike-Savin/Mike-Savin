Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    value: function (itemToRemove) {
        var removeCounter = 0;
        for (var index = 0; index < this.length; index++) {
            if (this[index] === itemToRemove) {
                this.splice(index, 1);
                removeCounter++;
                index--;
            }
        }
        return removeCounter;
    }
});

var d = function(id) {
        return document.getElementById(id);
    },
    q = function(query, parent) {
        if (!parent) parent = document;
        return document.querySelector(query);
    },
    qa = function(query, parent) {
        if (!parent) parent = document;
        return [].slice.call(document.querySelectorAll(query));
    };