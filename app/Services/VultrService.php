<?php
//VultrService.php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class VultrService
{
    protected $apiKey;
    protected $baseUrl;
    protected $collectionId;

    public function __construct()
    {
        $this->apiKey = config('services.vultr.api_key');
        $this->baseUrl = config('services.vultr.vector_store_url');
        $this->collectionId = config('services.vultr.collection_id');
    }

    public function addItem($content, $description)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post("{$this->baseUrl}/{$this->collectionId}/items", [
            'content' => $content,
            'description' => $description,
        ]);

        return $response->json();
    }

    public function search($query)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post("{$this->baseUrl}/{$this->collectionId}/search", [
            'query' => $query,
            'limit' => 5,
        ]);

        return $response->json();
    }
}