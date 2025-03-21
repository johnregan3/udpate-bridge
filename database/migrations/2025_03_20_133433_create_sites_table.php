<?php

use App\Enums\ConnectionStatus;
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
        Schema::create('sites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('url', 255)->default('');
            $table->unique(['user_id', 'url']); // Ensure that the URL is unique per user.
            $table->string('pretty_url', 255)->default('');
            $table->enum('connection_status', array_column(ConnectionStatus::cases(), 'value'))
                ->default(ConnectionStatus::Unknown->value);
            $table->boolean('bridge_plugin_installed')->default(false);
            $table->string('wp_core_version', 10)->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sites');
    }
};
