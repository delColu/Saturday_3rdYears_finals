return (
    <AuthenticatedLayout auth={auth} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Credits</h2>}>
        <Head title="Credits" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h1 className="text-2xl font-bold mb-4">Credits</h1>
                        <p className="mb-2">This project was developed by:</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>This idiot (me)- Mostly Everything</li>
                        </ul>
                        <p className="mb-2">Special thanks to:</p>
                        <ul className="list-disc list-inside">
                            <li><a href="https://www.flaticon.com/free-icons/retail" title="retail icons">Retail icons created by Frey Wazza - Flaticon</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
);
