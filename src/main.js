import './style.css'
import 'flowbite'
import Alpine from 'alpinejs'
 
window.Alpine = Alpine

Alpine.data('form', () => ({
    loading: false,
    submitted: false,
    formData: {
        transaction: 'expense',
        date: '',
        monthYear: '',
        month: '',
        year: '',
        category: '',
        amount: '',
        account: '',
        destinationAccount: '',
        notes: '',
    },
    forms: {
        expense: {
            names: {
                month: 'entry.1665901515',
                date: 'entry.687551178',
                category: 'entry.1602695596',
                amount: 'entry.1930946708',
                account: 'entry.1313498432',
                notes: 'entry.494079581',
            },
            action: 'https://docs.google.com/forms/d/e/1FAIpQLScLmvrLJC1z8qlgfsQ1xgriW8cKXOil_D8-1YWgUF_tnuQMWQ/formResponse'
        },
        income: {
            names: {
                month: 'entry.688109083',
                date: 'entry.687551178',
                category: 'entry.1602695596',
                amount: 'entry.1930946708',
                account: 'entry.1313498432',
                notes: 'entry.494079581',
            },
            action: 'https://docs.google.com/forms/d/e/1FAIpQLSdu-UwQy8ZFzjniKKOXRdTGGsFKO3I4UzKoA9jExSFnrkpCZA/formResponse'
        },
        transfer: {
            names: {
                month: 'entry.372125670',
                date: 'entry.687551178',
                amount: 'entry.1930946708',
                account: 'entry.1313498432',
                destinationAccount: 'entry.1181554330',
                notes: 'entry.494079581',
            },
            action: 'https://docs.google.com/forms/d/e/1FAIpQLSeFEAlPeRc2WKAf9JlFxbZiJgHfuHDygUu_vM93YJJ3mQWJcA/formResponse'
        }
    },
    categories: {
        expense: [
            'food',
            'transportation',
            'supplies',
            'entertainment',
            'healthcare',
            'skincare',
            'utilities',
            'gifts',
            'travel',
            'shopping',
            'savings',
            'receivables',
            'other',
        ],
        income: ['monthly salary', 'gift', 'receivables', 'remain balance', 'bonus', 'other']
    },
    accounts: ['Mandiri', 'BRI', 'Cash'],
    ucwords(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },
    formatToRupiah(number) {
        return parseInt(number).toLocaleString('id-ID');
    },
    formatAmount(event) {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, '');
        this.formData.amount = numericValue;
    },
    allowOnlyNumeric(event) {
        if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            return;
        }

        if ((event.key < '0' || event.key > '9')) {
            event.preventDefault();
        }
    },
    resetForm() {
        this.formData = {
            transaction: 'expense',
            date: '',
            monthYear: '',
            month: '',
            year: '',
            category: '',
            amount: '',
            account: '',
            destinationAccount: '',
            notes: '',
        };

        this.submitted = false;
        this.loading = false;
        const datepickerClearBtn = Array.from(document.querySelectorAll('button'))
            .find(button => button.textContent.trim() === 'Clear');

        if (datepickerClearBtn) {
            datepickerClearBtn.click();
        }
    },
    handleSubmit() {                    
        this.loading = true;
        
        if (!this.submitted) {
            this.$el.submit();
            this.submitted = true;
            
            this.resetForm();
        }
    },

    get formattedAmount() {
        return this.formData.amount ? this.formatToRupiah(this.formData.amount) : '';
    },
    set formattedAmount(value) {
        this.formData.amount = value.replace(/\D/g, '');
    },

    hideModal() {
        const datepickerHideButton = document.querySelector('[data-modal-hide="popup-datepicker"]');
        const monthpickerHideButton = document.querySelector('[data-modal-hide="popup-monthpicker"]');
        if (datepickerHideButton) {
            datepickerHideButton.click();
        }
        if (monthpickerHideButton) {
            monthpickerHideButton.click();
        }
    },

    init() {
        const datepickerEl = this.$refs.datepickerEl;

        datepickerEl.addEventListener('changeDate', (event) => {
            const selectedDate = event.detail.date;
            if (selectedDate) {
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(selectedDate.getDate()).padStart(2, '0');
                this.formData.date = `${year}-${month}-${day}`;
            } else {
                this.formData.date = '';
            } 
            this.hideModal()
        });

        this.$nextTick(() => {            
            const inlineMonthpickerEl = this.$refs.inlineMonthpickerEl;
            const inlinePicker = inlineMonthpickerEl.datepicker
            inlinePicker.setOptions({ 
                pickLevel: 1,
            })

            inlineMonthpickerEl.addEventListener('changeDate', (event) => {
                const selectedDate = event.detail.date;
                if (selectedDate) {
                    const year = selectedDate.getFullYear();
                    const month = selectedDate.toLocaleString('default', { month: 'long' });
                    this.formData.monthYear = `${month} ${year}`;
                    this.formData.month = `${month}`;
                    this.formData.year = `${year}`;
                } else {
                    this.formData.monthYear = '';
                    this.formData.month = '';
                    this.formData.year = '';
                } 
                inlinePicker.refresh({
                    forceRender: true
                })
                this.hideModal()
            })

            const monthpickerEl = this.$refs.monthpickerEl;
            const picker = monthpickerEl.datepicker
            picker.setOptions({ 
                pickLevel: 1,
            })

            monthpickerEl.addEventListener('changeDate', (event) => {
                const selectedDate = event.detail.date;
                if (selectedDate) {
                    const year = selectedDate.getFullYear();
                    const month = selectedDate.toLocaleString('default', { month: 'long' });
                    this.formData.monthYear = `${month} ${year}`;
                    this.formData.month = `${month}`;
                    this.formData.year = `${year}`;
                } else {
                    this.formData.monthYear = '';
                    this.formData.month = '';
                    this.formData.year = '';
                } 
                picker.refresh({
                    forceRender: true
                })
            })
        })
    }
}))
 
Alpine.start()