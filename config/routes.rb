Rails.application.routes.draw do

  root 'professors#students'

  # sessions routes
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#login'
  get '/logout' => 'sessions#logout'

  # student routes
  get '/students' => 'professors#students'
  get '/students/:id/:page' => 'professors#students_page'
  get '/grades' => 'professors#grades'
  post '/grades' => 'professors#grades'

  # exams routes
  get '/exams' => 'professors#exams'
  get '/halls' => 'professors#exam_hall'

end
