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

      @student["courses"].each_with_index do |value, key|
        @courses = Array.new
        @allCourses.each_with_index do |value2, key2|
          if key2 == key
            @courses.push(value2)
          end
        end
      end


    elsif params[:page] == "grades"

      @page = "grades"

      @student["courses"].each_with_index do |value, key|
        @grades = Array.new
        @allCourses.each_with_index do |value2, key2|
          if key2 == key
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

end
