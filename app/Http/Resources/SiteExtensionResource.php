<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiteExtensionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->extension->name,
            'slug' => $this->extension->slug,
            'type' => $this->extension->type,
            'installed_version' => $this->installed_version,
            'latest_version' => $this->extension->latest_version,
            'needs_update' => intval(version_compare($this->installed_version, $this->extension->latest_version, '<')),
            'activated' => $this->activated,
            'automatic_updates_enabled' => $this->automatic_updates_enabled,
        ];
    }
}
