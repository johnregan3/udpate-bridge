<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Site>
 */
class SiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $url = $this->faker->url;
        $pretty_url = parse_url($url, PHP_URL_HOST) . parse_url($url, PHP_URL_PATH);
        return [
            'url' => $url,
            'pretty_url' => $pretty_url,
            'connection_status' => $this->faker->randomElement(['connected', 'disconnected']),
            'bridge_plugin_installed' => $this->faker->boolean,
            'wp_core_version' => $this->faker->randomFloat(2, 1, 10),
        ];
    }
}
