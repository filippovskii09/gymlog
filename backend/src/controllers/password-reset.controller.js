export class PasswordResetController {
	
	constructor(passwordResetService) {
		this.passwordResetService = passwordResetService;
	}


	requestReset = async (req, res) => {
		try {
			const { email } = req.body;
			await this.passwordResetService.sendResetCode(email);

			res.json({ message: `Код надіслано на ${email} !` });
		} catch(error) {
			res.status(400).json({ message: error })
		}
	}


	verifyResetCode = async (req, res) => {
		try {
			const { email, code } = req.body;
			const resetToken = await this.passwordResetService.verifyResetCode(email, code);

			res.json({ resetToken });
		} catch(error) {
			res.status(400).json({ message: error })
		}
	}


	setNewPassword = async (req, res) => {
		try {
			const { resetToken, newPassword } = req.body;
			await this.passwordResetService.resetPassword(resetToken, newPassword);

			res.json({ message: "Пароль успішно змінено!" });
		} catch(error) {
			res.status(400).json({ message: error })
		}
	}
}