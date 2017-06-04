class ProfessorsController < ApplicationController
  before_action :authorize_user
  require 'json'

  # list students
  def students
    @students = firebase.get('students').body
  end

  # Show student courses/grades
  def students_page

    @student = firebase.get('students/'+params[:id]).body

    @allCourses = firebase.get('courses').body

    if params[:page] == "courses"

      @page = "courses"

      @student["courses"].each do |value|
        @courses = Array.new
        @allCourses.each do |value2|
          if value[0] == value2[0]
            @courses.push(value2)
          end
        end
      end


    elsif params[:page] == "grades"

      @page = "grades"

      @student["courses"].each do |value|
        @grades = Array.new
        @allCourses.each do |value2|
          if value[0] == value2[0]
            value2[1]["exam"] =  value[1]["exam"]
            @grades.push(value2)
          end
        end
      end
    end
  end


  # Add grades
  def grades
  end

  # View exams
  def exams
  end

  #View hall
  def exam_hall
    @students_ids = firebase.get('exams/'+ params[:exam] +'/halls/'+ params[:hall]).body
    @students = firebase.get('students').body;
  end
end
