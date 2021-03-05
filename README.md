# OrderCloud Next.js Authentication Example

Upon cloning this repository add a `.env.local` file with the following settings from your OrderCloud seller organization:

```
NEXT_PUBLIC_OC_CLIENT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
NEXT_PUBLIC_OC_SCOPE=MeAdmin,PasswordReset,Shopper
NEXT_PUBLIC_OC_ALLOW_ANONYMOUS=true
NEXT_PUBLIC_OC_BASE_API_URL=https://sandboxapi.ordercloud.io
```

- **`NEXT_PUBLIC_OC_CLIENT_ID`** - OrderCloud API Client ID
- **`NEXT_PUBLIC_OC_SCOPE`** - OrderCloud API Roles to be requested
- **`NEXT_PUBLIC_OC_ALLOW_ANONYMOUS`** _(Optional)_ - If you have set up your API Client for anonymous shopping
- **`NEXT_PUBLIC_OC_BASE_API_URL`** _(Optional)_ - Defaults to Production, use the base URL from you Organization Environment Settings