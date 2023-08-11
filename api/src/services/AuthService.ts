class AuthService {
  username: any;
  password: any;

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getToken() {
    return 'token';
  }
}

export = AuthService;
