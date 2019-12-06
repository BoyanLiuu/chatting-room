// load search result while new input
function filter(){
    // Declare variables
    var input, filter, lst, channel, a, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    lst = document.querySelector('#add-fav');
    channel = lst.querySelectorAll('.item');
    // count = 0;
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < channel.length; i++) {
        a = channel[i].querySelector('.caption');
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // count++;
            channel[i].style.display = "";
        } else {
            channel[i].style.display = "none";
        }
    }
    // if(count == 0){
    //     document.querySelector('.myttl').style.display="";
    // }else{
    //     document.querySelector('.myttl').style.display="none";
    // };
  }