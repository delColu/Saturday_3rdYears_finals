<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response as HttpResponse;

class ReportsController extends Controller
{
    /**
     * Display listing of reports.
     */
    public function index(Request $request): Response
    {
        $reports = Report::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('Reports/index', [
            'reports' => $reports,
        ]);

    }

    /**
     * Generate PDF report for selected period.
     */
    public function generatePdf(Request $request): HttpResponse
    {
        $period = $request->get('period', 'month');

        $query = Report::with('user')->orderBy('action');

        switch ($period) {
            case 'today':
                $query->whereDate('created_at', today());
                break;
            case 'week':
                $query->where('created_at', '>=', now()->subDays(7));
                break;
            case 'month':
                $query->where('created_at', '>=', now()->subMonth());
                break;
        }

        $reports = $query->get();

        $pdf = Pdf::loadView('reports.pdf', compact('reports', 'period'));

        return $pdf->download('reports-' . $period . '.pdf');
    }
}

