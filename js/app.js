$('document').ready(function() {

	// VARIABLES
	var itemInput = '#item-input',
			itemButton = '#add-item',
			itemForm = '#item-form',
			shoppingItemsList = '#shopping-items-list',
			shoppingItemsListAllItems = '#shopping-items-list div',
			cartItemsList = '#cart-items-list',
			cartItemsListAllItems = '#cart-items-list div',
			removedItemsList = '#removed-items-list',
			removedItemsListAllItems = '#removed-items-list div',
			msg = '#msg',
			keyNumber = 13,
			warning = 'warning',
			undoButton = '<span class="undo"><img src="images/undo.png" alt="undo"></span>',
			deleteButton = '<span class="delete"><img src="images/delete.png" alt="delete"></span>';



	// FUNCTIONS
	function addItem() {
		var item = $(itemInput).val();
		var formattedItem = '<div>'+ item + '</div>';
		// check if empty
		// check if duplicate
		showWarning();
		if(!$(itemInput).hasClass(warning)) {
			if (!isDuplicate(shoppingItemsListAllItems, item) &&
							!isDuplicate(cartItemsListAllItems, item) &&
							!isDuplicate(removedItemsListAllItems, item)) {
				$(shoppingItemsList).append(formattedItem).hide().fadeIn();
				$(itemInput).val('');
			}
		}
	}

	function keyPressed(event) {
		if (event.which == keyNumber) {
			addItem();
		}
	}

	function showWarning() {
		if( !$(itemInput).val() || $(itemInput).val().trim().length == 0) {
	    $(msg).html('Error: enter an item.');
	    $(itemInput).addClass(warning);
	    $(itemInput).val('');
    } else {
    	$(itemInput).removeClass(warning);
	    $(msg).html('');
    }
	}

	function isDuplicate(selector, item) {
		var arr = $(selector);
		for(i=0;i<arr.length;i++)
		{
		  if( $(arr[i]).text() == item) {
			  $(msg).html('Error: ' + item + ' is already present in your list.');
		  	$(itemInput).addClass(warning);
		  	return true;
		  }
		}
		return false;
	}

	function moveItemToCart() {
		var item = $(this).text();
		var formattedItem = '';

		$(this).remove();
		formattedItem = '<div>'+ item + deleteButton + undoButton + '</div>'
		$(cartItemsList).append(formattedItem).hide().fadeIn();
		$(cartItemsList).find('div').addClass('strike');
	}

	function moveToRemoved() {
		var item = $(this).parent().text();
		var formattedItem = '';

		$(this).parent().remove();
		formattedItem = '<div>'+ item + undoButton + '</div>'
		$(removedItemsList).append(formattedItem).hide().fadeIn();
		$(removedItemsList).find('div').addClass('strike');
	}

	function moveToShopping() {
		var item = $(this).parent().text();
		var formattedItem = '';

		$(this).parent().remove();
		formattedItem = '<div>'+ item + '</div>'
		$(shoppingItemsList).append(formattedItem).hide().fadeIn();
	}

	function brintToFront() {
		$(this).stop().animate({opacity: 1});
	}

	function moveToBack() {
		$(this).stop().animate({opacity: 0.75});
	}


	// INITIALIZE
	$(shoppingItemsList).sortable();
	$(cartItemsList).sortable();
	$(removedItemsList).sortable();


	// EVENT HANDLERS
	$(document).on('keydown', keyPressed);
	$(itemButton).on('click', addItem);
	$(itemInput).on('blur', showWarning);
	$(shoppingItemsList).on('click', 'div', moveItemToCart);
	$(cartItemsList).on('click', '.undo', moveToShopping);	
	$(cartItemsList).on('click', '.delete', moveToRemoved);
	$(cartItemsList).on('mouseenter', 'div', brintToFront);
	$(cartItemsList).on('mouseleave', 'div', moveToBack);
	$(removedItemsList).on('mouseenter', 'div', brintToFront);
	$(removedItemsList).on('mouseleave', 'div', moveToBack);
	$(removedItemsList).on('click', '.undo', moveToShopping);	
})