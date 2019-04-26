import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `web-authn`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class WebAuthn extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'web-authn',
        observer: '_savePassword',
      },
    };
  }

  _savePassword(){
    // https://medium.com/@herrjemand/introduction-to-webauthn-api-5fd1fb46c285
    // https://medium.com/@herrjemand/verifying-fido2-responses-4691288c8770

  //   var passwordcred = new PasswordCredential({
  //     'type': 'password',
  //     'id': 'alice',
  //     'password': 'VeryRandomPassword123456'
  // })
  
  // navigator.credentials.store(passwordcred)
  this._create();
  }
  
  _create() {
    var challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);
    var userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw='
    var id = Uint8Array.from(window.atob(userID), c=>c.charCodeAt(0))
    var publicKey = {
        'challenge': challenge,

        'rp': {
            'name': 'Example Inc.'
        },

        'user': {
            'id': id,
            'name': 'alice@example.com',
            'displayName': 'Alice Liddell'
        },

        'pubKeyCredParams': [
            { 'type': 'public-key', 'alg': -7  },
            { 'type': 'public-key', 'alg': -257 }
        ]
    }

    navigator.credentials.create({ 'publicKey': publicKey })
        .then((newCredentialInfo) => {
            console.log('SUCCESS', newCredentialInfo)
        })
        .catch((error) => {
            console.log('FAIL', error)
        })
  }
} window.customElements.define('web-authn', WebAuthn);
