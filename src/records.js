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
        this.modal.classList.add('modal');
        this.modalAskElem.appendChild(this.modal);
        
        this.buttonClose = document.createElement('div');
        this.buttonClose.classList.add('form__button-close');
        this.modal.appendChild(this.buttonClose);
        this.buttonClose.innerText = 'X';
        this.buttonClose.addEventListener('click', this.closeModalview());

        this.modalForm = document.createElement('div');
        this.modalForm.classList.add('form');
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
        this.buttonSave.innerText = 'SAVE';
        this.buttonSave.addEventListener('click', this.saveRecord());
    }

    initRecordsView() {
        const body = document.querySelector('body');
        this.modalView = document.createElement('div');
        this.modalView.classList.add('modal-view');
        body.appendChild(this.modalView);

        this.recordsTable = document.createElement('div');
        this.recordsTable.classList.add('records-view');
        this.modalView.appendChild(this.recordsTable);

        this.buttonClose = document.createElement('div');
        this.buttonClose.classList.add('button-close');
        this.recordsTable.appendChild(this.buttonClose);
        this.buttonClose.innerText = 'X';
        this.buttonClose.addEventListener('click', this.closeRecords());

        this.tableWtapper = document.createElement('div');
        this.tableWtapper.classList.add('table-wrapper');
        this.recordsTable.appendChild(this.tableWtapper);

        this.recordsHeader = document.createElement('h3');
        this.recordsHeader.classList.add('table-header');
        this.tableWtapper.appendChild(this.recordsHeader);

        this.table = document.createElement('table');
        this.table.classList.add('records-table');
        this.recordsTable.appendChild(this.table);

        this.th = ['№', 'Name', 'Score', 'Time']
        for (let i = 0; i < 4; i++) {
            this.th[0] = (document.createElement('th'));
            this.th[0].innerText = '';
        }

        this.td = [];
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
        // if (localStorage.getItem('gameSave') !== 'undefined' && localStorage.getItem('gameSave') !== null) this.load();
        // else {
        this.modalAskElem.style.display = 'none';
        this.initRecordsView();

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
            this.modalAskElem.style.display = 'none';
        }
    }

    closeRecords() {
        return () => {
            this.modalAskElem.style.display = 'flex';
        }
    }
}

export default Records;