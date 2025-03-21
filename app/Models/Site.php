<?php

namespace App\Models;

use App\Enums\ConnectionStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Site.
 *
 * @property int               $id                       The Site ID.
 * @property ?int              $user_id                  The user ID that created the site.
 * @property string            $url                      The site URL, including the protocol.
 * @property string            $pretty_url               The site URL, without the protocol.
 * @property ConnectionStatus  $connection_status        The connection status of the site. Default: 'unknown'.
 * @property bool              $bridge_plugin_installed  The If the Bridge Plugin is installed.
 * @property string            $wp_core_version          The Site's WP Core version.
 */
class Site extends Model
{

    use HasFactory;

    protected $casts = [
        'connection_status' => ConnectionStatus::class,
    ];

    protected $fillable = [
        'bridge_plugin_installed',
        'connection_status',
        'pretty_url',
        'url',
        'user_id',
        'username',
        'wp_core_version',
    ];

    /**
     * Relationships
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function appPassword(): HasOne
    {
        return $this->hasOne(AppPassword::class);
    }
}
