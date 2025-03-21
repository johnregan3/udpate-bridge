<?php

namespace App\Http\Controllers\api;

use App\Enums\ConnectionStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\SiteResource;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use App\Models\User;

class SiteController extends Controller
{

    /**
     * Display a listing of Sites.
     *
     * GET Request.
     */
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();
        $sites = $user->sites()->get();

        return SiteResource::collection($sites);
    }

    /**
     * Store a newly created Site.
     *
     * POST Request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
            'connection_status' => ['nullable', new Enum(ConnectionStatus::class)],
            'wp_core_version' => 'nullable|string',
            'bridge_plugin_installed' => 'nullable|boolean',
        ]);

        /** @var User $user */
        $user = Auth::user();
        $site = new Site();
        $site->user_id = $user->id;
        $site->url = trim(trim($request->url), '/');
        $site->pretty_url = $this->pretty_url($request->url);
        $site->connection_status = $request->connection_status ?? ConnectionStatus::Unknown;
        $site->wp_core_version = $request->wp_core_version ?? '';
        $site->bridge_plugin_installed = $request->bridge_plugin_installed ?? false;

        // try/catch block to handle any exceptions that may occur.
        // Try saving a non-unique URL to trigger the error.
        $site->save();

        return new SiteResource($site);
    }

    /**
     * Display a Site.
     *
     * GET Request.
     */
    public function show(string $id)
    {
        /** @var User $user */
        $user = Auth::user();
        $site = $user->sites()->where('id', $id)->first();

        return new SiteResource($site);
    }

    /**
     * Update a Site.
     *
     * PUT|PATCH Request.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Delete a site.
     *
     * DELETE Request.
     */
    public function destroy(string $id)
    {
        //
    }

    public function pretty_url($url)
    {
        return parse_url($url, PHP_URL_HOST) . parse_url($url, PHP_URL_PATH);
    }
}
