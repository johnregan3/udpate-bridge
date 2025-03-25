<?php

namespace App\Http\Controllers;

use App\Enums\ConnectionStatus;
use App\Events\SiteAdded;
use App\Models\Site;
use App\Http\Resources\SiteResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response as ResponseStatus;

/**
 * Note that this controls web requests, not API requests.
 *
 * Class SiteController
 * @package App\Http\Controllers
 */
class SiteController extends Controller
{
    public function index()
    {
        $sites = Site::where('user_id', auth()->id())->get();
        $sites = SiteResource::collection($sites)->toArray(request());
        return Inertia::render('Dashboard', [
            'sites' => $sites
        ]);
    }

    public function create(Request $request)
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
        $site->pretty_url = self::pretty_url($request->url);
        $site->connection_status = $request->connection_status ?? ConnectionStatus::Unknown;
        $site->wp_core_version = $request->wp_core_version ?? '';
        $site->bridge_plugin_installed = $request->bridge_plugin_installed ?? false;

        try {
            $site->save();
        } catch (\Exception $e) {
            return response()->json(
                [
                    'error' => 'An error occurred while creating this Site.',
                    'message' => $e->getMessage()
                ],
                ResponseStatus::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        SiteAdded::dispatch($site);

        return to_route('sites.list')->with('success', 'Site added successfully!');
    }

    public static function pretty_url($url)
    {
        return parse_url($url, PHP_URL_HOST) . parse_url($url, PHP_URL_PATH);
    }
}
