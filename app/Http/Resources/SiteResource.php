<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiteResource extends JsonResource
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
            'url' => $this->url,
            'pretty_url' => $this->pretty_url,
            'connection_status' => $this->connection_status,
            'bridge_plugin_installed' => $this->bridge_plugin_installed,
            'wp_core_version' => $this->wp_core_version,
            'site_extensions' => SiteExtensionResource::collection($this->siteExtensions)->toArray($request),
        ];
    }
}
