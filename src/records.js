class Records {
    constructor(modalAskElem = null, listRecords = null) {
        this.modalAskElem = modalAskElem;
        this.listRecords = listRecords;
        this.initModelView();
    }

    initModelView() {
        const body = document.querySelector('body');
        this.modalAskElem = document.createElement('div');
        this.modalAskElem.classList.add('modal-ask');
        body.appendChild(this.modalAskElem);
        
        this.modal = document.createElement('div');
        this.modal.classList.add('modal')
        this.modalAskElem.appendChild(this.modal);
        

        this.modalForm = document.createElement('div');
        this.modalForm.classList.add('form')
        this.modal.appendChild(this.modalForm);

        this.buttonClose = document.createElement('div');
        this.buttonClose.classList.add('form__button-close');
        this.modalForm.appendChild(this.buttonClose);
        this.buttonClose.innerText = 'X';

        this.labelName = document.createElement('label');
        this.labelName.classList.add('form__label');
        this.modalForm.appendChild(this.labelName);
        this.labelName.innerText = 'Введите ваше Имя';
        
        this.inputName = document.createElement('input');
        this.inputName.classList.add('form__input');
        this.modalForm.appendChild(this.inputName);

        this.buttonSave = document.createElement('button');
        this.buttonSave.classList.add('form__button-save');
        this.modalForm.appendChild(this.buttonSave);
    }

    save(score, time) {
        console.log(score, time);
        // модальное окно с вводом имени и кнопкой сохранить
        // если кнопку нажали, то сохраняем в локал сторедж
        // иначе закрываем окно
    }

    show() {
        // загрузить из локалстореджа данные о рекордах
        // показать модальное окно с рекордами
    }

    closeRecords() {
        // закрыть модальное окно при нажатие на крестик или внешнюю область
    }
}

export default Records;