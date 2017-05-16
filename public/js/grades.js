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

firebase.database().ref('/students').once("value", function(snapshot){
  var students = snapshot.val()
  for (var student in students){
    if (students.hasOwnProperty(student))
    {
      var select = document.getElementById('select-student');
      var opt = document.createElement('option');
      opt.value = student;
      opt.text = student;
      select.add(opt);
    }
  }
  $('#select-student').prop('disabled', false);
});


$('#select-student').change(function(){
  $('#select-course option:not(:eq(0))').remove();
  $('#select-course option:eq(0)').prop('selected', true)
  $('#select-course').prop('disabled', true);
  firebase.database().ref('/students/'+$( "#select-student option:selected").val()).once("value", function(snapshot){
    var student = snapshot.val()
    for (var course in student.courses){
      if (student.courses.hasOwnProperty(course))
      {
        var select = document.getElementById('select-course');
        var opt = document.createElement('option');
        opt.value = course;
        opt.text = course;
        select.add(opt);
      }
    }
    $('#select-course').prop('disabled', false);
  });
});

$('#apply').click(function(){
    var student_id = $('#select-student').val();
    var course_id = $('#select-course').val();
    var midterm_grade = $('input[name="midterm_grade"]').val();
    var final_grade = $('input[name="final_grade"]').val();
    var total_grade = $('input[name="total_grade"]').val();
    firebase.database().ref('students/'+student_id+'/courses/'+course_id+'/exam/mid_term_grades').set(midterm_grade);
    firebase.database().ref('students/'+student_id+'/courses/'+course_id+'/exam/final_grades').set(final_grade);
    firebase.database().ref('students/'+student_id+'/courses/'+course_id+'/exam/total_grade').set(total_grade);
    alert('Grades applied successfully.')
    location.reload();
});
