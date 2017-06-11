Rails.application.routes.draw do

  root 'professors#home'

  # sessions routes
  get '/home' => 'professors#home'

  # sessions routes
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#login'
  get '/logout' => 'sessions#logout'

  # student routes
  get '/students' => 'professors#students'
  get '/students/:id/:page' => 'professors#students_page'
  get '/grades' => 'professors#grades'
  post '/grades' => 'professors#grades'

  # final results routes
  get '/final_results' => 'professors#final_results'

end
