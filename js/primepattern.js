(function initializeDatasetDropdown() {

    function numericSuffix(i) {
        var suffix = 'th';

        if (i < 4 || i > 20) {
            var mod = i % 10;
            if (mod == 1) {
                suffix = 'st';
            } else if (mod == 2) {
                suffix = 'nd';
            } else if (mod == 3) {
                suffix = 'rd';
            }
        }

        return suffix;
    }

    function makeOption(i) {
        return '<option value="' + i + '">' + i + numericSuffix(i) + '</option>';
    }

    function initializeDropdown() {
        var options = [],
            i = 0;

        while (options.length < 50) {
            options.push(makeOption(++i));
        }

        $('.dataset-dropdown').html(options.join(''));
    }

    initializeDropdown();
})();


(function initializeCanvas() {
    var canvas = document.getElementsByTagName('canvas').item(0),
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height;

    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, width, height);
})();