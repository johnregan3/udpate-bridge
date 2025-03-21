<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class SiteExtension.
 *
 * A instance of a Plugin or Theme on a specific Site.
 *
 * @property int     $id                         The SiteExtension ID.
 * @property int     $site_id                    The Site ID.
 * @property int     $extension_id               The Base Extension ID.
 * @property string  $installed_version          The currently installed version.
 * @property bool    $activated                  If the Extension is currently activated.
 * @property string  $automatic_updates_enabled  If automatic updates are enabled for this extension.

 */
class SiteExtension extends Model
{
    protected $fillable = [
        'activated',
        'automatic_updates_enabled',
        'extension_id',
        'installed_version',
        'site_id',
    ];

    /**
     * Relationships.
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    public function extension(): BelongsTo
    {
        return $this->BelongsTo(Extension::class);
    }
}
