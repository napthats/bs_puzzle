var com;
if (!com) com = {};
if (!com.napthats) com.napthats = {};
if (!com.napthats.util) com.napthats.util = {};

$(document).ready(function() {
    Array.prototype.clone = function() {
        var result = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
            if (this[i].constructor === Array) {
                result[i] = this[i].clone();
            }
            else {
                result[i] = this[i];
            }
        }
        return result;
    }
});
