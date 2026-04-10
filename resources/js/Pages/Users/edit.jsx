import { useForm } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// import { InputLabel, PrimaryButton, TextInput, InputError } from '@/Components';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { usePage } from '@inertiajs/react';


export default function Edit({ auth, user }) {

  const { data, setData, put, processing, errors } = useForm({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email,
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {

    e.preventDefault();

    put(route('users.update', user.id));

  };

  return (

    <AuthenticatedLayout

      user={auth.user}

      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit User</h2>}

    >

      <div className="py-12">

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          <div className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

            <div className="p-6 text-gray-900">

              <form onSubmit={submit}>

                <div>
                  <InputLabel htmlFor="first_name" value="First Name" />
                  <TextInput
                    id="first_name"
                    name="first_name"
                    value={data.first_name}
                    className="mt-1 block w-full"
                    autoComplete="given-name"
                    onChange={(e) => setData('first_name', e.target.value)}
                    required
                  />
                  <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="last_name" value="Last Name" />
                  <TextInput
                    id="last_name"
                    name="last_name"
                    value={data.last_name}
                    className="mt-1 block w-full"
                    autoComplete="family-name"
                    onChange={(e) => setData('last_name', e.target.value)}
                    required
                  />
                  <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div className="mt-4">

                  <InputLabel htmlFor="email" value="Email" />

                  <TextInput

                    id="email"

                    type="email"

                    name="email"

                    value={data.email}

                    className="mt-1 block w-full"

                    autoComplete="username"

                    onChange={(e) => setData('email', e.target.value)}

                    required

                  />

                  <InputError message={errors.email} className="mt-2" />

                </div>

                <div className="mt-4">

                  <InputLabel htmlFor="password" value="Password" />

                  <TextInput

                    id="password"

                    type="password"

                    name="password"

                    value={data.password}

                    className="mt-1 block w-full"

                    autoComplete="new-password"

                    onChange={(e) => setData('password', e.target.value)}

                  />

                  <InputError message={errors.password} className="mt-2" />

                </div>

                <div className="mt-4">

                  <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                  <TextInput

                    id="password_confirmation"

                    type="password"

                    name="password_confirmation"

                    value={data.password_confirmation}

                    className="mt-1 block w-full"

                    autoComplete="new-password"

                    onChange={(e) => setData('password_confirmation', e.target.value)}

                  />

                  <InputError message={errors.password_confirmation} className="mt-2" />

                </div>

                <div className="flex items-center justify-end mt-4">

                  <PrimaryButton className="ml-4" disabled={processing}>

                    Update User

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
