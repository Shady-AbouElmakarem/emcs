// Initialize Firebase
var config = {
 apiKey: "AIzaSyCgoXAtAEW5qUULXQ8G-5HHdxP4xb2Asv0",
 authDomain: "emcs-8a479.firebaseapp.com",
 databaseURL: "https://emcs-8a479.firebaseio.com",
 projectId: "emcs-8a479",
 storageBucket: "emcs-8a479.appspot.com",
 messagingSenderId: "188205356981"
};

firebase.initializeApp(config);

$('#select-level').change(function(){
  $("table").removeClass('hidden');
  $('table tbody tr').remove();
  firebase.database().ref('/exams/').once("value", function(snapshot){
    var exams = snapshot.val()
    for (var exam in exams){
      if (exams.hasOwnProperty(exam))
      {
        var course_id = exams[exam].course_id;
        firebase.database().ref('/courses/'+ course_id).once("value", function(snap){
          var course_name = snap.val().course_name;
          if(snap.val().course_level == $('#select-level').val()){
            var halls_array = "";
            var halls = exams[exam].halls;
            for (var hall in halls){
              if(halls.hasOwnProperty(hall))
              {
                halls_array += "<a href='/halls/?exam="+ exam + "&hall="+ hall + "&course_name="+ course_name +"'>"+ hall +"</a>, "
              }
            }
            halls_array = halls_array.slice(0,-2);
            $('table tbody').append(
              '<tr>'
              +'<td>'+ course_name +'</td>'
              +'<td>'+ course_id +'</td>'
              +'<td>'+ halls_array +'</td>'
              +'</tr>'
            );
          }
        });
      }
    }
  });
});
