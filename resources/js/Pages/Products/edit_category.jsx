import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { InputError, InputLabel, PrimaryButton, SecondaryButton, TextInput } from '@/Components';

export default function EditCategory({ category }) {
    const { patch, data, setData, processing, errors, setKey } = useForm({
        name: category.name,
        description: category.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('categories.update', category.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-gray-200">
                    Edit Category: {category.name}
                </h2>
            }
        >
            <Head title={`Edit ${category.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-6">
                                <Link href={route('categories.index')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                    ← Back to Categories
                                </Link>
                            </div>

                            <form onSubmit={submit}>
                                <div className="mb-6">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mb-6">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <SecondaryButton>Cancel</SecondaryButton>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Category'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

