// Wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $('.add-burger').on('submit', event => {
    event.preventDefault();

    const newBurger = {
      name: $('#burger').val().trim()
    };

    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    })
    .then((res) => {
      console.log("New burger added to the order. The order number is " + res.id + ".");
      location.replace('/');
    })
    .catch(error => {
      console.log("Error encountered attempting to post and insert new burger.\n", error);
    });
  });

  $('.devour-burger').on('click', event => {
    const id = event.target.getAttribute("data-id");
    const devour = event.target.getAttribute("data-devoured");
    
    console.log("id = " + id);
    console.log("Devoured = " + devour);
    
    const newDevouredState = {
      devoured: devour
    };
    console.log(id);
    $.ajax('api/burgers/' + id, {
      type: 'PUT',
      data: newDevouredState
    })
    .then(() => {
      location.reload();
    });
  });
});