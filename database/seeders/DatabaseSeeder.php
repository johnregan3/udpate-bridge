<?php

namespace Database\Seeders;

use App\Models\Extension;
use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        Site::factory()->count(6)->create([
            'user_id' => $user->id,
        ]);

        Extension::factory()->count(10)->create();

        // Randomly assign extensions to sites, adding SiteExtension records.
        Site::all()->each(function (Site $site) {
            $extensions = Extension::inRandomOrder()->limit(rand(0, 6))->get();
            $site->siteExtensions()->createMany($extensions->map(function (Extension $extension) {
                return [
                    'extension_id' => $extension->id,
                    'installed_version' => abs($extension->latest_version - rand(0, 5)),
                    'activated' => rand(0, 1),
                    'automatic_updates' => rand(0, 1),
                ];
            })->toArray());
        });
    }
}
