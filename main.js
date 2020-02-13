/**
 * Each permission category needs to increment its level depending on any extra
 * rules added.
 * 
 * For example for the user category:
 *      If "write" (2) is selected:
 *          user = 2
 *      If alongside write, "read" (4) is selected:
 *          user = 6
 * 
 * If any of the selected rules are deselected, the category level should
 * decrement by that rule's respective level.
 */

window.onload = function() {
    var permissions = {
        'user': 0,
        'group': 0,
        'other': 0,
    }

    function addClickEvents() {
        var permLevelButtons = document.getElementsByClassName('perm-level');
        var buttonAmount = permLevelButtons.length;

        for (var index = 0; index < buttonAmount; index++) {
            var button = permLevelButtons[index];
            button.addEventListener('click', selectPermissionLevel);
        }
    }

    function selectPermissionLevel() {
        var level = parseInt(this.dataset.level);
        var category = this.dataset.category;

        if (this.classList.contains('selected')) {
            this.classList.remove('selected');

            permissions[category] -= level;

            console.log(permissions)
            return permissions;
        }
        
        removeSelectionFromPermButtons('perm-level-user');

        this.classList.add('selected');

        if (level !== 0) {
            showExtraPerms(level, category);
        }

        console.log(permissions)
        permissions[category] += level;

        return permissions;
    }

    
    function removeSelectionFromPermButtons(className) {
        var buttons = document.getElementsByClassName(className);
        var buttonsAmount = buttons.length;

        for (var index = 0; index < buttonsAmount; index++) {
            var button = buttons[index];
            button.classList.remove('selected');
        }
    }

    function showExtraPerms(selectedLevel, category) {
        var extraPerms = document.getElementById('extra-perms');
        extraPerms.classList.remove('d-none');

        var buttons = extraPerms.children;

        for (var index = 0; index < extraPerms.childElementCount; index++) {
            var button = buttons[index];
            hideOrShowExtraPermButton(button, selectedLevel, category);
        }
    }

    function hideOrShowExtraPermButton(button, selectedLevel, category) {
        if (button.dataset.level == selectedLevel) {
            button.classList.add('d-none');
            return;
        }

        button.classList.remove('d-none');
        button.addEventListener('click', function(e) {
            var button = e.target;
            addExtraPermLevel(button, category);
        });
    }

    function addExtraPermLevel(button, category) {
        var level = parseInt(button.dataset.level);
        permissions[category] += level;
        console.log(permissions)
    }

    addClickEvents();
}