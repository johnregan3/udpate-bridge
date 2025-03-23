<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Site>
 */
class ExtensionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $name = $this->faker->sentence(2);
        $slug = strtolower(str_replace(' ', '-', $name));
        return [
            'type' => $this->faker->randomElement(['plugin', 'theme']),
            'name' => $name,
            'slug' => $slug,
            'latest_version' => $this->faker->randomFloat(2, 1, 10),
        ];
    }
}
