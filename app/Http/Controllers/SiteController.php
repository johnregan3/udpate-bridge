<?php

namespace App\Http\Controllers;

use App\Models\Site;
use App\Http\Resources\SiteResource;
use Inertia\Inertia;
use Inertia\Request;

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
        return Inertia::render('SiteList', [
            'sites' => $sites
        ]);
    }
}
