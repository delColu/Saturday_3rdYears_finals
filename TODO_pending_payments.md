# TODO: Add Pending Payments Filter to Payments Tab

## Steps:

### 1. Update Backend Controller (app/Http/Controllers/PaymentsController.php)
- Modify __invoke(Request $request) to filter by ?status=pending|success|all
- Pass current status filter to props for active tab

### 2. Update Frontend UI (resources/js/Pages/Payments/index.jsx)
- Add tabs: All | Pending | Success above table
- Use router.page.url or props.status for active tab
- Links: /payments?status=all&page=1 etc.
- Preserve pagination with status

### 3. Test
- Seed pending payments (update PaymentFactory/Seeder status='pending')
- Filter tabs, verify lists correct statuses
- Pagination works per filter

### 4. Complete
- Mark ✅
