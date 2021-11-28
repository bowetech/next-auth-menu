import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";


export default NextAuth({
	//JSON Web Tokens are enabled 
	session: {
		jwt: true,
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code"
				}
			}
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET
		}),

		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],

	//SQL or MongoDB database connection (or leave empty)
	// database: process.env.DATABASE_URL,

	callbacks: {
		async jwt({ token, user }) {
			// first time jwt callback is run, user object is available
			if (user) {
				//	token.id = user.id;
				token.id = user.id;
			}

			return token;
		},

		async session({ session, token, user }) {

			if (token) {
				// session.id = token.id; // accessToken
				session.user.id = token.id;
			}

			return session;
		},
	},

	jwt: {
		secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
		maxAge: 60 * 60 * 24 * 30,
		encryption: true,
	},
})