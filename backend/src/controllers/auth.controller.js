export class AuthController {

	constructor(authService) {
		this.authService = authService;
	}


	register = async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await this.authService.register(email, password);
		} catch(error) {
			res.status(400).json({ message: error });
		}
	};


	login = async (req, res) => {
		try {
			const { email, password } = req.body;
			const { accessToken, refreshToken } = await this.authService.login(email, password);

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: false,
				sameSite: "strict"
			});

			res.json({ accessToken });
		} catch(error) {
			res.status(400).json({ message: error });
		}
	};
}