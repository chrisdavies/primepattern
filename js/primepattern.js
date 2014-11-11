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