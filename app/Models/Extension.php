<?php

namespace App\Models;

use App\Enums\ExtensionType;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Extension.
 *
 * An Extension is a WP Plugin or Theme.
 *
 * @property int            $id              The Extension ID.
 * @property ExtensionType  $type            The type of extension (plugin, theme).
 * @property string         $slug            The extension (plugin) slug.
 * @property string         $name            The extension name.
 * @property string         $latest_version  The latest available version of the extension.
 */
class Extension extends Model
{
    protected $casts = [
        'type' => ExtensionType::class,
    ];

    protected $fillable = [
        'latest_version',
        'name',
        'slug',
        'type',
    ];
}
