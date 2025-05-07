function carrusel(){
    $.ajax({
      type: "POST",
      dataType: "json",
      url: friendlyURL('?module=home&op=carrusel'),
    })
    .done(function( data ) {
      for (row in data) {
        $('<div></div>').attr('class',"carrusel_elements").attr('id', data[row].brand_name).appendTo(".carrusel_list").html( 
          "<img class='carrusel_img' id='' src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/" + data[row].brand_img +"' alt=''>"
        )
      }
        
      var slider = new Glider(document.querySelector('.carrusel_list'),{ 
        slidesToShow: 1,
        dots: '.carrusel_indicator',
        draggable: true,
      });

      slideAutoPaly(slider, '.carrusel_list');

      function slideAutoPaly(glider, selector, delay = 4000, repeat = true) {
        let autoplay = null;
        const slidesCount = glider.track.childElementCount;
        let nextIndex = 1;
        let pause = true;

        function slide() {
          autoplay = setInterval(() => {
            if (nextIndex >= slidesCount) {
              if (!repeat) {
                clearInterval(autoplay);
              } else {
                nextIndex = 0;
              }
            }
            glider.scrollItem(nextIndex++);
          }, delay);
        }

        slide();

        var element = document.querySelector(selector);
        element.addEventListener('mouseover', (event) => {
          if (pause) {
              clearInterval(autoplay);
              pause = false;
          }
        }, 300);

        element.addEventListener('mouseout', (event) => {
          if (!pause) {
            slide();
            pause = true;
          }
        }, 300);
      }

    })
    .fail(function() {
      console.log('Error: Carousel error');
    }); 
}

function category() {
  ajaxPromise(friendlyURL("?module=home&op=category"), 'GET', 'JSON')
  .then(function( data ) {
      for (row in data) {
        content = data[row].category_name.replace(/_/g, " ");
        $('<div></div>').attr('class', "category_elements").attr('id', data[row].category_name).appendTo("#cat").html(
          "<div class='col-4 col-12-medium'>"+
            "<section class='box feature'>"+
              "<img src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/" + data[row].category_img + "' id='"+ data[row].cod_category +"'/>"+
              "<div class='inner'>"+        
                "<h2 class='category_title'>"+ content +"</h2>"+
              "</div>"+
            "</section>"+
          "</div>"
        )
      }
  })
  .catch(function() {
    console.log('Error: Categories error');
  });    
}

function types() {
    ajaxPromise(friendlyURL("?module=home&op=type"), 'GET', 'JSON')
    .then(function( data ) {
      for (row in data) {
          $('<div></div>').attr('class', "card").attr('id', data[row].type_name).appendTo(".container_cards").html(
            "<div class='face face1'>"+
              "<div class='content'>"+
                "<img src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/" + data[row].type_img +"'>"+
              "</div>"+
            "</div>"+
            "<div class='face face2'>"+
              "<div class='content'>"+
                "<h2>"+ data[row].type_name +"</h2>"+
              "</div>"+ 
            "</div>" 
          )
      }
    })
    .catch(function() {
      console.log('Error: Types error');
    });
}

function clicks() {
  $(document).on("click",'.carrusel_elements', function (){
    var filters = [];
    filters.push({"brand_name":[this.getAttribute('id')]});
    localStorage.removeItem('filters')
    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.setItem('currentPage', 'shop-list');
      setTimeout(function(){ 
        window.location.href = friendlyURL('index.php?module=shop&op=view');
      }, 200);  
  }); 

  $(document).on("click",'.category_elements', function (){
    var filters = [];
    filters.push({"category_name":[this.getAttribute('id')]});
    localStorage.removeItem('filters')
    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.setItem('currentPage', 'shop-list');
      setTimeout(function(){ 
        window.location.href = friendlyURL('index.php?module=shop&op=view');
      }, 200);  
  });

  $(document).on("click",'.card', function (){
    var filters = [];
    filters.push({"type_name":[this.getAttribute('id')]});
    localStorage.removeItem('filters')
    localStorage.setItem('filters', JSON.stringify(filters)); 
    localStorage.setItem('currentPage', 'shop-list');
      setTimeout(function(){ 
        window.location.href = friendlyURL('index.php?module=shop&op=view');
      }, 200);  
  });
}

function load_suggestions() {
  var limit = 3;

  $(document).on("click", '#load_more_button', function () {
    $('#news_container').empty();
    limit = limit + 3;

    $.ajax({
      type: 'GET',
      dataType: "json",
      url: "https://www.googleapis.com/books/v1/volumes?q=electric%20car",
    }).done(function (data) {
      var DatosJson = JSON.parse(JSON.stringify(data));
      for (i = 0; i < limit; i++) {
        var ElementDiv = document.createElement('div');
        ElementDiv.innerHTML =
            "<br><div id='cont_img'><img src='" + data['items'][i]['volumeInfo']['imageLinks']['thumbnail'] + "' class='cart' cat='" + data['items'][i]['volumeInfo']['categories'] + "' data-toggle='modal' data-target='#exampleModal'></div><div id='list_header'><hr><span id='li_brand'>  " + DatosJson.items[i].volumeInfo.title + "</br>" + "</span></div></hr>";
        document.getElementById("news_container").appendChild(ElementDiv);
      }
      if (limit === 9) {
        $('.load_more_button').remove();
      }
    });
  })
}

function get_suggestions() {
  limit = 3;

  $.ajax({
    type: 'GET',
    dataType: "json",
    url: "https://www.googleapis.com/books/v1/volumes?q=electric%20car",
  }).done(function (data) {
    var DatosJson = JSON.parse(JSON.stringify(data));
    DatosJson.items.length = limit;
    for (i = 0; i < DatosJson.items.length; i++) {
        var ElementDiv = document.createElement('div');
        ElementDiv.innerHTML =
            "<br><div id='cont_img'><img src='" + data['items'][i]['volumeInfo']['imageLinks']['thumbnail'] + "' class='cart' cat='" + data['items'][i]['volumeInfo']['categories'] + "' data-toggle='modal' data-target='#exampleModal'></div><div id='list_header'><hr><span id='li_brand'>  " + DatosJson.items[i].volumeInfo.title + "</br>" + "</span></div></hr>";
        document.getElementById("news_container").appendChild(ElementDiv);
    }
  });
  load_suggestions();
}

$(document).ready(function() {
  types();
  category();
  carrusel();
  get_suggestions();
  clicks();
});