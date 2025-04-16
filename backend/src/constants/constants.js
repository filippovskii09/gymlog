export const CORS_WHITE_LIST = [
  'http://192.168.1.101:3000',
  'http://localhost:3000',
  'https://gymlog-phi.vercel.app',
];

export const EMAIL_CONTENT = (resetCode) => `
<div style="font-family: 'Arial', sans-serif; background-color: #f4f7fc; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto;">
	<h2 style="text-align: center; color: #4a90e2; font-size: 30px; font-weight: bold;">
		Відновлення пароля
	</h2>
	<p style="font-size: 18px; color: #444; text-align: center;">
		Твій код для відновлення пароля:
	</p>
	<p style="font-size: 36px; font-weight: bold; color: #fff; text-align: center; letter-spacing: 3px; background: linear-gradient(90deg, rgba(74,144,226,1) 0%, rgba(112,208,255,1) 100%); padding: 10px 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
		${resetCode}
	</p>
	<p style="font-size: 18px; color: #444; text-align: center;">
		Цей код дійсний протягом 15 хвилин.
	</p>
	<hr style="border: 1px solid #e0e0e0; margin: 30px 0;" />
	<p style="font-size: 14px; color: #888; text-align: center; font-style: italic;">
		Якщо це не ви запитали відновлення пароля, проігноруйте цей лист.
	</p>
</div>
`;
