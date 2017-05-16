class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :firebase, :find_id, :current_user

  def firebase
    base_uri = 'https://emcs-8a479.firebaseio.com/'
    firebase = Firebase::Client.new(base_uri)
  end

  def find_id(table_hash,item_key,item_value)
    table_hash.each do |id_key,id_value|
      id_value.each do |id_value_key, id_value_value|
        if id_value_key == item_key && id_value_value == item_value
          return id_key
        end
      end
    end
    return nil
  end

  def current_user
    @current_user ||= firebase.get("/users/"+session[:user_id]).body if session[:user_id]
  end

  def authorize_user
    redirect_to '/login' unless current_user
  end

  def logged_user
    if current_user
      redirect_to '/students'
    end
  end
end
