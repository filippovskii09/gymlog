export class PasswordResetController {
  constructor(passwordResetService) {
    this.passwordResetService = passwordResetService;
  }

  requestReset = async (req, res) => {
    try {
      const { email } = req.body;
      await this.passwordResetService.sendResetCode(email);

      res.json({ message: `Код надіслано на ${email}` });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Невідома помилка. Спробуйте пізніше.';
      res.status(400).json({ message });
    }
  };

  verifyResetCode = async (req, res) => {
    try {
      const { email, code } = req.body;
      const resetToken = await this.passwordResetService.verifyResetCode(email, code);

      res.json({ resetToken });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Невідома помилка. Спробуйте пізніше.';
      res.status(400).json({ message });
    }
  };

  setNewPassword = async (req, res) => {
    try {
      const { resetToken, newPassword } = req.body;
      await this.passwordResetService.resetPassword(resetToken, newPassword);

      res.json({ message: 'Пароль успішно змінено!' });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Невідома помилка. Спробуйте пізніше.';
      res.status(400).json({ message });
    }
  };
}
