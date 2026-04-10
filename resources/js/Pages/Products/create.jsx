import { useForm } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ auth, categories }) {

  const { data, setData, post, processing, errors, progress } = useForm({

    name: '',

    description: '',

    status: 'available',

    price: '',

    stock: '',

    category_id: '',

    image: null,

  });

  const submit = (e) => {

    e.preventDefault();

    post(route('products.store'));

  };

  return (

    <AuthenticatedLayout

      user={auth.user}

      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Product</h2>}

    >

      <div className="py-12">

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          <div className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

            <form onSubmit={submit} enctype="multipart/form-data">

              <div>

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

              <div className="mt-4">

                <InputLabel htmlFor="description" value="Description" />

                <textarea

                  id="description"

                  name="description"

                  rows="3"

                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"

                  value={data.description}

                  onChange={(e) => setData('description', e.target.value)}

                ></textarea>

                <InputError message={errors.description} className="mt-2" />

              </div>

              <div className="mt-4">

                <InputLabel htmlFor="price" value="Price" />

                <TextInput

                  id="price"

                  type="number"

                  step="0.01"

                  name="price"

                  value={data.price}

                  className="mt-1 block w-full"

                  onChange={(e) => setData('price', e.target.value)}

                  required

                />

                <InputError message={errors.price} className="mt-2" />

              </div>

              <div className="mt-4">

                <InputLabel htmlFor="stock" value="Stock" />

                <TextInput

                  id="stock"

                  type="number"

                  name="stock"

                  value={data.stock}

                  className="mt-1 block w-full"

                  onChange={(e) => setData('stock', e.target.value)}

                  required

                />

                <InputError message={errors.stock} className="mt-2" />

              </div>

              <div className="mt-4">

                <InputLabel htmlFor="category_id" value="Category" />

                <select

                  id="category_id"

                  name="category_id"

                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                  value={data.category_id}

                  onChange={(e) => setData('category_id', e.target.value)}

                  required

                >

                  <option value="">Select a category</option>

                  {categories.map((category) => (

                    <option key={category.id} value={category.id}>

                      {category.name}

                    </option>

                  ))}

                </select>

                <InputError message={errors.category_id} className="mt-2" />

              </div>

              <div className="mt-4">

                <InputLabel htmlFor="image" value="Image" />

                <input

                  id="image"

                  name="image"

                  type="file"

                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"

                  onChange={(e) => setData('image', e.target.files[0])}

                  accept="image/*"

                />

                {progress && progress.bytes && progress.total && (
                  <div className="mt-2 text-sm text-gray-500">
                    Uploading {Math.round((progress.bytes / progress.total) * 100)}%
                  </div>
                )}
                <InputError message={errors.image} className="mt-2" />

              </div>

              <div className="flex items-center justify-end mt-4">

                <PrimaryButton className="ml-4" disabled={processing}>

                  Create Product

                </PrimaryButton>

              </div>

            </form>

          </div>

        </div>

      </div>

    </AuthenticatedLayout>

  );

}
