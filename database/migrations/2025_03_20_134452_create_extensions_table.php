<?php

use App\Enums\ExtensionType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('extensions', function (Blueprint $table) {
            $table->id();
            $table->enum('type', array_column(ExtensionType::cases(), 'value'))->default(ExtensionType::Unknown->value);
            $table->string('slug', 255); // Intentionally not empty/nullable.
            $table->string('name', 255)->default('');
            $table->string('latest_version', 20)->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extensions');
    }
};
