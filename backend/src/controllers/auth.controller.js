export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    try {
      const { email, password, name, username } = req.body;

      await this.authService.register(email, password, name, username);

      res.status(200).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await this.authService.login(email, password);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      res.status(200).json({ accessToken, user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      const { userId } = req.body;
      await this.authService.logout(userId);

      res.clearCookie('refreshToken');
      res.status(200).json({ message: 'Вихід успішний' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  refreshToken = async (req, res) => {
    try {
      const oldRefreshToken = req.cookies.refreshToken;
      if (!oldRefreshToken) {
        throw new Error('Токен відсутній');
      }

      const { accessToken, refreshToken } = await this.authService.refreshToken(oldRefreshToken);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
