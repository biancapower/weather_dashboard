# frozen_string_literal: true

require "httparty"

class WeatherService
  include HTTParty
  base_uri "https://api.openweathermap.org/data/2.5"

  def initialize
    @api_key = ENV.fetch("OPENWEATHER_API_KEY")
  end

  def current_weather(city)
    self.class.get("/weather", query: {
      q: city,
      appid: @api_key,
      units: "metric"
    })
  end
end
