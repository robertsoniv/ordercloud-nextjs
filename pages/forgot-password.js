import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div className="max-w-xl mx-auto py-12 w-full">

        <div className="space-y-8">
            <div>
                <h2 className="text-2xl mb-1">Jane Doe</h2>
                <p className="mb-3 text-gray-500">This user <b>is not a member</b> of the "discount" user group so you will see $10.00 price on "Cotton T-shirt".</p>
                <p className="mb-3 text-gray-500">This is also the default context user, so the <code>OrderCloudContext.user</code> object will look very similar to when you are <em>unauthenticated</em>.</p>
                <pre className="text-red-500">
                    <code>{`Username: buyer01\nPassword: password1234`}</code>
                </pre>
            </div>
            <hr/>
            <div>
                <h2 className="text-2xl mb-1">John Smith</h2>
                <p className="mb-3 text-gray-500">This user <b>is a member</b> of the "discount" user group so you will see an $8.00 price on "Cotton T-shirt".</p>
                <pre>
                    <code className="text-red-500">{`Username: buyer02\nPassword: password1234`}</code>
                </pre>
            </div>
        </div>
        <div className="mt-8 text-center">
        <Link href="/login">
            <a className="text-red-500 font-bold hover:bg-red-100 rounded px-6 py-3">← Back to Login</a>
        </Link>
        </div>
        </div>
    )
}