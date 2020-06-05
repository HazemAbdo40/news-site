
var data = [];
var apiKey = '...';
var country = 'eg'

var http = new XMLHttpRequest;
function getData(myCategory) {

   http.open(`GET`, `http://newsapi.org/v2/top-headlines?country=${country}&category=${myCategory}&apiKey=${apiKey}`);
   http.send();
   http.addEventListener('readystatechange', function () {
      if (http.readyState == 4 && http.status == 200) {
         data = JSON.parse(http.response).articles;
         displayData();
      }
   })
}
function displayData() {
   let result = ``;
   for (let i = 0; i < data.length; i++) {
      result += `
      
         <div class="col-md-4 col-sm-6 p-2 cont mt-5">
         <div class=''>
         <a class='m-auto' href="${data[i].url}">
            <img class='w-100' src="${data[i].urlToImage}">
            </a>
            <h4>${data[i].title}</h4>
            <br />
            <h6>Date : ${data[i].publishedAt}</h6>
            <br />
            <p>${data[i].description}</p>
            <br />
            <a class='btn btn-info w-50 m-auto readMore' href="${data[i].url}">Read More</a>
            </div>
         </div>`;
   }
   $('#Row').html(result);
}
getData('general');
$('.nav-link').click(function () {
   let path = $(this).text();
   getData(path);
});
$('.navbar-brand').click(function(){
   let path = 'general';
   getData(path);
})
$('.nav-item').click(function () {

   $(this).addClass('bdr');
   $(this).siblings().removeClass('bdr');
})
$('.btnUp').click(function () {
   $("html , body").animate({ scrollTop: '0' }, 1500);
   $(this).css('border', 'none');
})
$(window).scroll(function () {
   let wScroll = $(window).scrollTop();
   let b = $('#Row').offset().top;
   if (wScroll > b) {
      $('.btnUp').fadeIn(500);
   }
   else {
      $('.btnUp').fadeOut(500);
   }
})
$(document).ready(function(){
   $('#loading').fadeOut(2000 , function(){
      $('body').css('overflow' , 'auto');
   });
})
