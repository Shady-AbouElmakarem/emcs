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
var exams, courses;

firebase.database().ref('/courses/').once("value", function(snapshot){
  courses = snapshot.val();
  firebase.database().ref('/exams/').once("value", function(snap){
    exams = snap.val()
    $('#select-level').prop('disabled', false);
  });
});

$('#select-level').change(function(){
  $("table").removeClass('hidden');
  $('table tbody tr').remove();
  for (var exam in exams){
    if (exams.hasOwnProperty(exam))
    {
      var course_id = exams[exam].course_id;
      if(courses[course_id].course_level == $('#select-level').val()){
        var course_name = courses[course_id].course_name;
        var exam_type = exams[exam].exam_type;
        var halls = exams[exam].halls;
        var halls_array = "";
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
          +'<td>'+ exam_type +'</td>'
          +'<td>'+ halls_array +'</td>'
          +'</tr>'
        );
      }
    }
  }
});
