export class User {
  constructor(
    public uid: string,
    public email: string,
    public displayName: string,
    public role: string,
    public imageUrl: string,
    public state: string,
    public city: string
  ) {}
}
