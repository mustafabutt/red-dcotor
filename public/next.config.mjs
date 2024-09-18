/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        STRIPE_SECRET_KEY:'sk_test_51PuKHbB7c1vTOLUcMIj3dJCU713JqnU7W41wIhghZnjMg2Eml3mE6MsPQ15Pico0nliQq063DtIZFgiLc8Ml9Ymf00POhHy0XS',
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY:'pk_test_51PuKHbB7c1vTOLUcdWRaq76URdbAJhICxJmc1r3MxnIsRwhbTNfNlvm3NFHdp5LFjHGsrGqsf4z9ZFkhwcPf47lO00n93oJk31'
      },
};

export default nextConfig;
