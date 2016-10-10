Rails.application.routes.draw do

  get 'snakegames' => 'snakegames#index'
  get 'tests' => 'tests#index'
end

