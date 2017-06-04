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
        firebase.database().ref('/courses/'+ course +'/course_name' ).once("value", function(snapshot2){
          var course_name = snapshot2.val();
          var select = document.getElementById('select-course');
          var opt = document.createElement('option');
          opt.value = course;
          opt.text = course_name;
          select.add(opt);
        });
      }
    }
    $('#select-course').prop('disabled', false);
  });
});

$('#apply').click(function(){
    var student_id = $('#select-student').val();
    var course_id = $('#select-course').val();
    var semester_hours;
    var midterm_marks = $('input[name="midterm_marks"]').val();
    var final_marks = $('input[name="final_marks"]').val();
    var practical_marks = $('input[name="practical_marks"]').val();
    var total_grade = parseInt(midterm_marks) + parseInt(final_marks) + parseInt(practical_marks);
    firebase.database().ref('/courses/'+ course_id +'/semester_hours' ).once("value", function(snapshot){
      semester_hours = snapshot.val();
      if (semester_hours != "2" && semester_hours != "3" && semester_hours != "4"){
        total_grade = "Error in semester_hours";
      }
      else {
        if (semester_hours == "3"){
          total_grade *= 2/3;
        }
        else if (total_grade == "4"){
          total_grade /= 2;
        }
        if(total_grade == 100){
          total_grade = "A+";
        }
        else if (total_grade >= 93 && total_grade <100) {
          total_grade = "A";
        }
        else if (total_grade >= 90 && total_grade <93) {
          total_grade = "A-";
        }
        else if (total_grade >= 87 && total_grade <90) {
          total_grade = "B+";
        }
        else if (total_grade >= 83 && total_grade <87) {
          total_grade = "B";
        }
        else if (total_grade >= 80 && total_grade <83) {
          total_grade = "B-";
        }
        else if (total_grade >= 77 && total_grade <80) {
          total_grade = "C+";
        }
        else if (total_grade >= 73 && total_grade <77) {
          total_grade = "C";
        }
        else if (total_grade >= 70 && total_grade <73) {
          total_grade = "C-";
        }
        else if (total_grade >= 67 && total_grade <70) {
          total_grade = "D+";
        }
        else if (total_grade >= 63 && total_grade <67) {
          total_grade = "D";
        }
        else if (total_grade >= 60 && total_grade <63) {
          total_grade = "D-";
        }
        else if (total_grade < 60) {
          total_grade = "F";
        }
      }
      firebase.database().ref('students/'+student_id+'/courses/'+course_id+'/exam/mid_term_marks').set(midterm_marks);
      firebase.database().ref('students/'+student_id+'/courses/'+course_id+'/exam/final_marks').set(final_marks);
      firebase.database().ref('students/'+student_id+'/courses/'+course_id+'/exam/practical_marks').set(practical_marks);
      firebase.database().ref('students/'+student_id+'/courses/'+course_id+'/exam/total_grade').set(total_grade);
    });
    alert('Grades applied successfully.');
    location.reload();
});
