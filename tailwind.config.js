import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                fruit: {
                    green: {
                        50: '#f0fdf4',
                        500: '#22c55e',
                        600: '#16a34a',
                    },
                    orange: {
                        400: '#fb923c',
                        500: '#f97316',
                    },
                    yellow: {
                        400: '#facc15',
                        banana: '#f59e0b',
                    },
                    lime: '#84cc16',
                }
            }
        },
    },

    plugins: [forms],
};
