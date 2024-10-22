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
        category: '',
        amount: '',
        account: '',
        destinationAccount: '',
        notes: '',
    },
    actions: {
        expense: 'https://docs.google.com/forms/d/e/1FAIpQLScLmvrLJC1z8qlgfsQ1xgriW8cKXOil_D8-1YWgUF_tnuQMWQ/formResponse',
        income: 'https://docs.google.com/forms/d/e/1FAIpQLSdu-UwQy8ZFzjniKKOXRdTGGsFKO3I4UzKoA9jExSFnrkpCZA/formResponse',
        transfer: 'https://docs.google.com/forms/d/e/1FAIpQLSeFEAlPeRc2WKAf9JlFxbZiJgHfuHDygUu_vM93YJJ3mQWJcA/formResponse',
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
            'other',
        ],
        income: ['monthly salary', 'gift']
    },
    accounts: ['Mandiri', 'BRI'],
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
            category: '',
            amount: '',
            account: '',
            destinationAccount: '',
            notes: '',
        };

        this.submitted = false;
        this.loading = false;
    },
    handleSubmit() {                    
        this.loading = true;
        
        if (!this.submitted) {
            this.$el.submit();
            this.submitted = true;
            
            this.resetForm();
        }
    },

    get action() {
        return this.actions[this.formData.transaction];
    },
    get formattedAmount() {
        return this.formData.amount ? this.formatToRupiah(this.formData.amount) : '';
    },
    set formattedAmount(value) {
        this.formData.amount = value.replace(/\D/g, '');
    },

    init() {}
}))
 
Alpine.start()