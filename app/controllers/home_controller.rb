class HomeController < ApplicationController
  def index
    return unless params[:city]

    begin
      response = WeatherService.new.current_weather(params[:city])

      if response.success?
        @weather = JSON.parse(response.body, symbolize_names: true)
      else
        error_message = response.parsed_response["message"] || "City not found"
        flash.now[:alert] = "Weather data error: #{error_message}"
      end
    rescue => e
      flash.now[:alert] = "Could not fetch weather data: #{e.message}"
    end
  end
end
