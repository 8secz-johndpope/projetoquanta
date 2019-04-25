import * as React from 'react';
import styles from './style.css';




export class Login extends React.Component<Login>{
  render(){
    return (
      <div className={styles["login-page"]}>
        <div>
          <img src="http://unicredafinidade.com.br/admin/arquivos/images/logo-quanta.png"></img>
          </div>
          <div className={styles["form form-input form-button form button:hover form button:active form button:focus"]}>
            <form className={styles["login-form" ] }>
             <input type="text" placeholder="Usuário"/>
             <input type="password" placeholder="Senha"/>
             <button>Logar</button>
            </form>
          </div>
      </div>


    );
  }

}
