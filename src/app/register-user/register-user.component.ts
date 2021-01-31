import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserService } from '../user.service';

export enum MODE {
  CADASTRAR,
  EDITAR
}


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  formRegistration: FormGroup
  modo = MODE.CADASTRAR
  isLoading = false
  feedback = {
    message: '',
    show: false,
    class: 'success'
  }
  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.formRegistration = new FormGroup({
      name: new FormControl(null),
      phone: new FormControl(null),
    })
    console.log('initForm: ', this.formRegistration)
  }

  onSubmit() {
    this.isLoading = true
    let user = {
      name: this.formRegistration.get('name').value,
      phone: this.formRegistration.get('phone').value,
    } as User
    console.log('cadastrando...', user);
    const result = this.userServ.postUser(user)
    result.subscribe((res) => {
      console.log('cadastro res: ', res)
      if (res.user != null) {
        this.feedback = {
          message: 'Cadastrado com sucesso!',
          show: true,
          class: 'success'
        }
      } else if (res.httpHandler != null) {
        this.feedback = {
          message: res.httpHandler.msg ?? 'Ocorreu um erro! Tente novamente mais tarde',
          show: true,
          class: 'error'
        }
      }
    })
    
    this.isLoading = false
  }

  get textoBotao() {
    return this.modo == MODE.CADASTRAR ? 'Cadastrar' : 'Editar'
  }

  get titulo() {
    return this.modo == MODE.CADASTRAR ? 'Cadastrar novo cliente' : 'Editar cliente'
  }


}
