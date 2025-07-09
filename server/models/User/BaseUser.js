export class BaseUser {
  constructor({ name, email, role = "user", provider }) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.provider = provider;
    this.createdAt = new Date();
  }

  toPublicJSON() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
      provider: this.provider,
    };
  }
}