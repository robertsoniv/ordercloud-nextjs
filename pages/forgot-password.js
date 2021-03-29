import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Container  from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";

export default function ForgotPassword() {
    return (
        <Container maxWidth="sm">
            <Box marginY={4}>                
                <Typography variant="h5" component="h2">
                    Jane Doe
                </Typography>
                <Typography paragraph>
                    This user <b>is not a member</b> of the "discount" user group so you will see $10.00 price on "Cotton T-shirt".
                </Typography>
                <Typography paragraph>
                    This is also the default context user, so the <code>OrderCloudContext.user</code> object will look very similar to when you are <em>unauthenticated</em>.
                </Typography>
                <Typography paragraph color="textSecondary">
                    <code>{`Username: buyer01\nPassword: password1234`}</code>
                </Typography>
                <Divider style={{marginBottom: 15}}/>
                <Typography variant="h5" component="h2">
                    John Smith
                </Typography>
                <Typography paragraph>
                    This user <b>is a member</b> of the "discount" user group so you will see an $8.00 price on "Cotton T-shirt".
                </Typography>
                <Typography paragraph color="textSecondary">
                    <code>{`Username: buyer01\nPassword: password1234`}</code>
                </Typography>
                <Link href="/login">
                    <a className="text-red-500 font-bold hover:bg-red-100 rounded px-6 py-3">← Back to Login</a>
                </Link>
            </Box>
        </Container>
    )
}