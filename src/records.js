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
        
        this.buttonClose = document.createElement('div');
        this.buttonClose.classList.add('form__button-close');
        this.modal.appendChild(this.buttonClose);
        this.buttonClose.innerText = 'X';
        this.buttonClose.addEventListener('click', this.closeModalview())

        this.modalForm = document.createElement('div');
        this.modalForm.classList.add('form')
        this.modal.appendChild(this.modalForm);

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
        this.buttonSave.innerText = 'SAVE'
        this.buttonSave.addEventListener('click', this.saveRecord());
    }

    initRecordsView() {

    }

    addNewRecord(score, time) {
        console.log(score, time);
        this.modalAskElem.style.display = 'flex';
    }

    addRecord(value) {
        let records;
        if (localStorage.getItem('records') !== 'undefined') {
            records = JSON.parse(localStorage.getItem('records'));
            for (let i = 0; i < 10; i++) {
                if (records[i] === null || records[i] < value) {
                    records[i] = value;
                }
            }
        } else {
            records = {
                0: value,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
            };
        }
        localStorage.setItem('records', JSON.stringify(records));
    }

    showRecords() {
        let records = localStorage.getItem('records');
        // загрузить из локалстореджа данные о рекордах
        // показать модальное окно с рекордами
    }

    saveRecord() {
        return () => {
            if (this.inputName.value !== '') {
                this.addRecords(this.inputName.value);
            }
            this.showRecords();
        }
    }

    closeModalview() {
        return () => {
            console.log('qqq');
            this.modalAskElem.style.display = 'none';
        }
    }

    closeRecords() {
        // закрыть модальное окно при нажатие на крестик или внешнюю область
    }
}

export default Records;