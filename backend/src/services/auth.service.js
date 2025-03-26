import bcrypt from "bcryptjs";

export class AuthService {
	
	constructor(userRepository) {
		this.userRepository = userRepository;
	}


	async register(email, password) {
		const existingUser = await this.userRepository.findByEmail(email);
		if(existingUser) throw new Error("Email вже використовується!");

		const hashedPassword = await bcrypt.hash(password, 10);

		return this.userRepository.create({ email, password: hashedPassword });
	}


	async login(email, password) {
		const user = await this.userRepository.findByEmail(email);
		if(!user) throw new Error("Користувача з такий email не знайдено!");

		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch) throw new Error("Пароль не вірний!");

		const accessToken = this.generateAccessToken(user?.id);
		const refreshToken = this.generateRefreshToken(user?.id);

		await this.userRepository.updateRefreshToken(user.id, refreshToken);

		return { accessToken, refreshToken };
	}


	generateAccessToken(userId) {
		return jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
	}


	generateRefreshToken(userId) {
		return jwt.sign({ userId }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
	}
}
