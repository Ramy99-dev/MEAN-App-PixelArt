export class User
{
  firstName : String ;
  lastName : String ;
  email : String ;
  password : String;
  gender : String ;

  constructor(firstName : String , lastName : String , email : String , password : String , gender : String)
  {
      this.firstName = firstName ;
      this.lastName = lastName ;
      this.email = email ;
      this.password = password ; 
      this.gender = gender ;
  }

}