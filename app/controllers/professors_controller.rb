class ProfessorsController < ApplicationController
  before_action :authorize_user
  require 'json'

  # home
  def home
  end

  def students
    @students = firebase.get('students').body
  end

  # Show student courses/grades
  def students_page

    @student = firebase.get('students/'+params[:id]).body

    @allCourses = firebase.get('courses').body

    if params[:page] == "courses"

      @page = "courses"

      @courses = Array.new

      @student["courses"].each do |value|
        @allCourses.each do |value2|
          if value[0] == value2[0]
            @courses.push(value2)
            break
          end
        end
      end


    elsif params[:page] == "grades"

      @page = "grades"

      @grades = Array.new

      @student["courses"].each do |value|
        @allCourses.each do |value2|
          if value[0] == value2[0]
            value2[1]["exam"] =  value[1]["exam"]
            @grades.push(value2)
            break
          end
        end
      end
    end
  end


  # Add grades
  def grades
  end

  # Final Results
  def final_results
    @students = firebase.get('students').body
    @courses = firebase.get('courses').body
  end

end
