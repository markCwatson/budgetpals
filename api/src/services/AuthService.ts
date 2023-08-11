class AuthService {
  private username: string;
  private password: string;

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getToken() {
    return 'token';
  }
}

export default AuthService;
