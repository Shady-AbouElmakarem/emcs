class SessionsController < ApplicationController

  before_action :logged_user, except: [:logout]
  before_action :authorize_user, only: [:logout]
  layout "sessions.html.erb"

  def new
  end

  def login
    if(params[:email])
      @user_id = find_id(firebase.get("/users").body, "email", params[:email])
      unless @user_id == nil
        # Admin exists.
        @user = firebase.get("/users/"+@user_id).body
        if @user["password"] == params[:password]
          #password entered is correct.
          session[:user_id] = @user_id
          redirect_to '/students'
        else
          #wrong password, back to the login form.
          redirect_to '/login', :flash => { :notice => "Wrong User ID or Password" }
        end
      else
        # no such email registered
        redirect_to '/login', :flash => { :notice => "Wrong User ID or Password" }
      end
    else
      # no form submitted
      redirect_to '/login', :flash => { :notice => "GET THE FUCK OUTTA HERE" }
    end
  end

  def logout
    reset_session
    @current_user = nil
    redirect_to '/login'
  end
end
