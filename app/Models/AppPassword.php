<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Crypt;

/**
 * Class AppPassword.
 *
 * @property int     $id                    The AppPassword ID.
 * @property ?int    $user_id               The user ID that created the site.
 * @property ?int    $site_id               The Site ID that this belongs to.
 * @property string  $base_url              The base URL for WP Rest API.
 * @property string  $user_login            The admin username.
 * @property string  $application_password  The WP App Password.
 */
class AppPassword extends Model
{
    protected $hidden = ['application_password'];

    protected $fillable = [
        'application_password',
        'base_url',
        'site_id',
        'user_login',
        'user_id',
    ];

    public function setApplicationPasswordAttribute($value)
    {
        $this->attributes['application_password'] = Crypt::encryptString($value);
    }

    public function getApplicationPasswordAttribute($value)
    {
        return Crypt::decryptString($value);
    }

    /**
     * Relationships.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
