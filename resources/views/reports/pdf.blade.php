<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reports - {{ ucfirst($period ?? 'All') }}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <h1>Activity Reports - {{ ucfirst($period ?? 'All') }}</h1>
    <p style="text-align: center; font-style: italic;">Generated on {{ \Carbon\Carbon::now()->format('Y-m-d H:i:s') }}</p>

    @if($reports->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                @foreach($reports as $report)
                    <tr>
                        <td>{{ $report->user->first_name }} {{ $report->user->last_name }}<br><small>{{ $report->user->email }}</small></td>
                        <td>{{ $report->action }}</td>
                        <td>{{ $report->description ?? 'N/A' }}</td>
                        <td>{{ $report->created_at->format('Y-m-d H:i:s') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p style="text-align: center; font-style: italic; color: #666;">No reports found for the selected period.</p>
    @endif

    <div class="footer">
        Total Reports: {{ $reports->count() }}
    </div>
</body>
</html>

