<?php
//AppServiceProvider.php
namespace App\Providers;

use App\Services\VultrService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(VultrService::class, function ($app) {
            return new VultrService();
        });
    }

    public function boot()
    {
        //
    }
}