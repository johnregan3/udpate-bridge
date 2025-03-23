<?php

namespace App\Listeners;

use App\Events\SiteAdded;
use App\Events\SiteUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CheckSite implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(SiteAdded|SiteUpdated $event): void
    {
        $site = $event->site;
    }
}
