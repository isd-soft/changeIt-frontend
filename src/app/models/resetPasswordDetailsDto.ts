
export class ResetPasswordDetailsDto {
  id: string;
  token: string;
  password: string;
  passwordConfirmation;


  constructor(id: string, token: string, password: string, passwordConfirmation) {
    this.id = id;
    this.token = token;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
  }
}
